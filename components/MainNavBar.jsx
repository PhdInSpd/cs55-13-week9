import {
    Button,
    Link
} from "@chakra-ui/react";

import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
} from '@chakra-ui/react';

import {
    ChevronDownIcon,
} from "@chakra-ui/icons"

const MainNavBar = () => {
    return(
        <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                Manage Collections
            </MenuButton>
            <MenuList>
                <MenuItem>
                    <Link href="/add-todo">Add Todo</Link>
                </MenuItem>
                <MenuItem>
                    <Link href="/todos-list">List All Todos</Link>
                </MenuItem>
                <MenuDivider />
                <MenuItem>
                    <Link href="/add-event">Add Event</Link>
                </MenuItem>
                <MenuItem>
                    <Link href="/">List All Event</Link>
                </MenuItem>
                <MenuDivider />
                <MenuItem>
                    <Link href="/add-contact">Add Contact</Link>
                </MenuItem>
                <MenuItem>
                    <Link href="/contacts-list">List All Contacts</Link>
                </MenuItem>
            </MenuList>
        </Menu>
    );
};
export default MainNavBar;