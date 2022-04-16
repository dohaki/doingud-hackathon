import { writeFile } from "node:fs/promises";
import { CeramicClient } from "@ceramicnetwork/http-client";
import { model as profileModel } from "@datamodels/identity-profile-basic";
import { ModelManager } from "@glazed/devtools";
import { DID } from "dids";
import { Ed25519Provider } from "key-did-provider-ed25519";
import { getResolver } from "key-did-resolver";
import { fromString } from "uint8arrays";

if (!process.env.SEED) {
  throw new Error("Missing SEED environment variable");
}

const CERAMIC_URL =
  process.env.CERAMIC_URL || "https://ceramic-clay.3boxlabs.com";

// The seed must be provided as an environment variable
const seed = fromString(process.env.SEED, "base16");
// Create and authenticate the DID
const did = new DID({
  provider: new Ed25519Provider(seed),
  resolver: getResolver(),
});
await did.authenticate();

// Connect to the Ceramic node
const ceramic = new CeramicClient(CERAMIC_URL);
ceramic.did = did;

// Create a manager for the model
const manager = new ModelManager(ceramic);

// Add basicProfile to the model
manager.addJSONModel(profileModel);

// Create the schemas
const reviewSchemaID = await manager.createSchema("Review", {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "Review",
  type: "object",
  properties: {
    date: {
      type: "string",
      format: "date-time",
      title: "date",
      maxLength: 30,
    },
    reviewedTokenAddress: {
      type: "string",
      title: "reviewedTokenAddress",
      maxLength: 64,
    },
    reviewedTokenId: {
      type: "number",
      title: "reviewedTokenId",
    },
    worstRating: {
      type: "number",
      title: "worstRating",
    },
    bestRating: {
      type: "number",
      title: "bestRating",
    },
    ratingValue: {
      type: "number",
      title: "ratingValue",
    },
    text: {
      type: "string",
      title: "text",
      maxLength: 4000,
    },
  },
});
const reviewsSchemaID = await manager.createSchema("Reviews", {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "ReviewsList",
  type: "object",
  properties: {
    reviews: {
      type: "array",
      title: "reviews",
      items: {
        type: "object",
        title: "ReviewItem",
        properties: {
          id: {
            $comment: `cip88:ref:${manager.getSchemaURL(reviewSchemaID)}`,
            type: "string",
            pattern: "^ceramic://.+(\\?version=.+)?",
            maxLength: 150,
          },
          title: {
            type: "string",
            title: "title",
            maxLength: 100,
          },
          reviewedTokenAddress: {
            type: "string",
            title: "reviewedTokenAddress",
            maxLength: 64,
          },
          reviewedTokenId: {
            type: "number",
            title: "reviewedTokenId",
          },
        },
      },
    },
  },
});

// Create the definition using the created schema ID
await manager.createDefinition("reviews", {
  name: "reviews",
  description: "Simple reviews",
  schema: manager.getSchemaURL(reviewsSchemaID),
});

// Write model to JSON file
await writeFile(
  new URL("model.json", import.meta.url),
  JSON.stringify(manager.toJSON())
);
console.log("Encoded model written to scripts/model.json file");
