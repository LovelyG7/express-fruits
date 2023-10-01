// update to fruits.js model
// create array of fruits
const express = require('express');
// connect to MongoDB
const mongoose = require('mongoose');
// Existing fruits array
const fruits = [
    {
        name: 'apple',
        color: 'red',
        readyToEat: true
    },
    {
        name: 'banana',
        color: 'yellow',
        readyToEat: true
    },
    {
        name: 'pear',
        color: 'green',
        readyToEat: false
    }
];

module.exports= fruits;









