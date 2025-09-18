// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Test} from "forge-std/Test.sol";
import {Card} from "../src/Card.sol";

contract CardTest is Test {
    Card public card;

    function setUp() public {
        card = new Card();
    }
}
