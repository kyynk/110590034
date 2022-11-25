import React from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
function MySidebar() {
    return (
        <Sidebar>
          <Menu>
            <SubMenu label="Charts">
              <MenuItem> Pie charts </MenuItem>
              <MenuItem> Line charts </MenuItem>
            </SubMenu>
            <SubMenu label="Game">
              <MenuItem> Tetris </MenuItem>
            </SubMenu>
            <SubMenu label="???">
              <MenuItem> ?? </MenuItem>
              <MenuItem> ? </MenuItem>
            </SubMenu>
            <MenuItem> Documentation </MenuItem>
            <MenuItem> Calendar </MenuItem>
          </Menu>
        </Sidebar>
    )
}

export default MySidebar;
