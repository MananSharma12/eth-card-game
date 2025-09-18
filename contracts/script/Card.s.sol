// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Script} from "forge-std/Script.sol";
import {Card} from "../src/Card.sol";

contract CardScript is Script {
    Card public card;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        card = new Card();

        vm.stopBroadcast();
    }
}
