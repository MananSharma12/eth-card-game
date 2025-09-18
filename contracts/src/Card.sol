// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {ERC721Enumerable} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract Card is ERC721Enumerable {
    enum Class {
        Warrior,
        Ranger,
        Mage,
        Healer,
        Rogue,
        Berserker,
        Shaman,
        Mindbender,
        Paladin,
        Warlock
    }

    enum Rarity {
        Common,
        Uncommon,
        Rare,
        Epic,
        Legendary
    }

    struct Attributes {
        uint8 strength;
        uint8 health;
        uint8 dexterity;
        uint8 intellect;
        uint8 magic;
    }

    struct Hero {
        Class classType;
        Rarity rarity;
        Attributes stats;
    }

    mapping(uint256 => Hero) public heroes;
    uint256 public mintPrice = 0.001 ether;
    uint256 private _nextTokenId = 1;

    error IncorrectAmount(uint256 sent, uint256 required);

    constructor() ERC721("HeroCard", "HEROCARD") {}

    function mint() external payable {
        if (msg.value != mintPrice) {
            revert IncorrectAmount(msg.value, mintPrice);
        }

        uint256 tokenId = _nextTokenId++;

        uint256 rand = uint256(
            keccak256(abi.encodePacked(block.timestamp, msg.sender, tokenId))
        );

        Class classType = getClass(rand);
        Rarity rarity = getRarity(rand);
        Attributes memory stats = rollAttributes(rand, rarity);

        heroes[tokenId] = Hero(classType, rarity, stats);

        _safeMint(msg.sender, tokenId);
    }

    function getClass(uint256 rand) internal pure returns (Class) {
        return Class(rand % 10);
    }

    function getRarity(uint256 rand) internal pure returns (Rarity) {
        uint256 roll = rand % 10000;

        if (roll < 7000) return Rarity.Common;
        else if (roll < 9000) return Rarity.Uncommon;
        else if (roll < 9800) return Rarity.Rare;
        else if (roll < 9980) return Rarity.Epic;
        else return Rarity.Legendary;
    }

    function rollAttributes (uint256 rand, Rarity rarity) internal pure returns (Attributes memory) {
        uint8 floor;
        if (rarity == Rarity.Common) floor = 1;
        else if (rarity == Rarity.Uncommon) floor = 15;
        else if (rarity == Rarity.Rare) floor = 25;
        else if (rarity == Rarity.Epic) floor = 35;
        else floor = 45;

        return Attributes({
            strength: randomStat(rand, 0, floor),
            health: randomStat(rand, 1, floor),
            dexterity: randomStat(rand, 2, floor),
            intellect: randomStat(rand, 3, floor),
            magic: randomStat(rand, 4, floor)
        });
    }

    function randomStat(uint256 rand, uint256 salt, uint8 floor) internal pure returns (uint8) {
        return floor + uint8(uint256(keccak256(abi.encode(rand, salt))) % (50 - floor + 1));
    }
}
