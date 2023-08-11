import { Outlet } from "react-router-dom";
import { Nav } from 'react-bootstrap';
import { NavTab } from "./atoms/tab/NavTab";
import {findAllItems, createMyItem, findMyItemList, deleteMyItem} from "../api/item/itemApi.txt";

function Item() {
    return (
        <>
            <Nav variant="underline" defaultActiveKey="">
                <NavTab label="뽑기" linkto="draw" linktype="Nav"></NavTab>
                <NavTab label="내아이템" linkto="list" linktype="Nav"></NavTab>
            </Nav>
            <div className="border-top my-2"></div>
            <Outlet></Outlet>
        </>
    );
}
export default Item;
