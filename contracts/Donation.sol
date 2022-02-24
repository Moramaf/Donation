// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.0 <0.9.0;

import "hardhat/console.sol";

contract Donation {

    address public owner;
    address[] public donators;
    mapping(address => uint) private DonationAmount;

    event getDonation(address _donator, uint _amount);

    constructor() {
        owner = msg.sender;
    }

    modifier isOwner() {
        require(msg.sender == owner, "Not an owner!");
        _;
    }

    function changeOwner(address _newOwner) external isOwner {
        owner = _newOwner;
    }

    receive() external payable {
        if(DonationAmount[msg.sender] == 0) {
            donators.push(msg.sender);
        }
        DonationAmount[msg.sender] += msg.value;
        emit getDonation(msg.sender, msg.value);
    }

    function withdraw(address payable _to) external isOwner{
        _to.transfer(address(this).balance);
    }

    function getDonators() public view returns (address[] memory) {
        return donators;
    }

    function getDonatorValue (address _donator) public view returns(uint) {
        return DonationAmount[_donator];
    }
}