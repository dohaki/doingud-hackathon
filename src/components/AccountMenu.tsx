import {
  Button,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Flex,
} from "@chakra-ui/react";
import {
  AvatarPlaceholder,
  useConnection,
  useViewerID,
  useViewerRecord,
} from "@self.id/framework";

import { getProfileInfo } from "../utils";

export default function AccountMenu() {
  const [connection, connect, disconnect] = useConnection();
  const viewerID = useViewerID();
  const profileRecord = useViewerRecord("basicProfile");

  if (viewerID === null) {
    return (
      <Button
        isLoading={connection.status === "connecting"}
        onClick={() => connect()}
        loadingText="Connecting..."
      >
        Connect
      </Button>
    );
  }

  const { displayName } = getProfileInfo(viewerID.id, profileRecord.content);

  return (
    <Menu>
      {({ isOpen }) => (
        <>
          <MenuButton isActive={isOpen} as={Button}>
            <Flex direction="row" alignItems="center" gap="3">
              <AvatarPlaceholder did={viewerID.id} size={32} />
              <Text>{displayName}</Text>
            </Flex>
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => disconnect()}>Disconnect</MenuItem>
          </MenuList>
        </>
      )}
    </Menu>
  );
}
