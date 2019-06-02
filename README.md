# Hoover Project

Hoover project is a small program that takes an input file describing a room, dirt spots, and hoover position and directions outputs a summary of the final position and number of areas cleaned by the hoover 

## Installation

Download the file and put it in a directory with an input.txt file that follows the structure below

## Usage

Run 'node trayFloorClean.js' in Terminal

## input.txt format

Cartesian coordinates are two integers

First line is size of room

Second line is initial hoover position

Third line and on are dirt positions

Last line is a set of cardinal directions for the hoover that define its movements - N,E,S,W

An example input.txt is included in Github

## Graphic Mode

Graphic mode outputs a picture in Terminal that shows a graphical representation of the room initially and after each step to better follow the progress as output 

Initial setup (line 4):

var graphic_mode = false

To turn on graphic mode:

var graphic_mode = true

## Outputs

The final outputs of the program are two lines, the final hoover position and the number of spots it cleaned in the run. If graphic mode is on, there will be several room representations that appear before this output (this output is last)

An example output would have two lines, a coordinate set describing the position and the number of spots cleaned:

1 3

1
