var fs = require('fs');

// Terminal Output Graphical Model, turn on for pic
var graphic_mode = false

// VARIABLES
// read file
var content = fs.readFileSync('input.txt','utf8')
var by_line = content.split(/\r?\n/)
// get size of room, rs, and initial position, ip
var rs = by_line[0].split(" ")
for (var i=0; i<rs.length; i++) { rs[i] = +rs[i] } 
var ip = by_line[1].split(" ")
for (var i=0; i<ip.length; i++) { ip[i] = +ip[i] }
// get string of directions and num_dirt_spots. extra ifs in case whiteline at end of input.txt
var directions = by_line[by_line.length-1]
var num_dirt_spots = by_line.length-3
if (directions.length==0) {
    directions = by_line[by_line.length-2]
    num_dirt_spots=num_dirt_spots-1
}
// MAIN's variables
var cleaned_spot_is = []
var position = ip
var clean_count = 0

// FUNCTIONS
// function move - moves the hoover, takes spot [x y] and dir "N"/S/E/W
function move(spot, dir) {
    return subtract_arr(spot-dir2arr(dir))
}
// function directionToArray - changes dir "N"/S/E/W to subtractable array
function directionToArray(dir) {
    if (dir=="N") {return [0, -1]}
    if (dir=="E") {return [-1, 0]}
    if (dir=="S") {return [0, 1]}
    if (dir=="W") {return [1, 0]}
    console.log("I could not translate the direction")
}
// function subtractArray - subtracts one (arr2) from another (arr1) 
function subtractArray(arr1,arr2) {
    x = [];
    for (var i = 0;i<=arr1.length-1;i++)
        x.push(arr1[i] - arr2[i]);
    return x
}
// function isDirty checks if position is dirty
function isDirty(pos) {
    for (var i = 0; i < num_dirt_spots; i++) {
        var dirt = by_line[i+2].split(" ")
        for (var j=0; j<dirt.length; j++) { dirt[j] = +dirt[j] }
        if (subtractArray(pos,dirt)[0]===0 && subtractArray(pos,dirt)[1]===0) {
            for (var k=0; k<cleaned_spot_is.length; k++) { 
                //console.log("Already cleaned that"+pos)
                if (i==cleaned_spot_is[k]) {return false}
            }
            cleaned_spot_is.push(i) 
            return true;
        }
    }
    return false;
}
// function terminalPic draws simple pic of room situation
function terminalPic(board_by_line, pos, clean_count, cleaned_spot_is, num_dirt_spots) {
    var map = []
    for (var j=0;j<rs[1];j++) {
        map[j]=[]
        for (var k=0;k<rs[0];k++) {
            map[j][k]=" "
            }
    }
    for (var j = 0;j<num_dirt_spots;j++) {
        var cont = false
        dirty = by_line[j+2].split(" ")
        map[rs[1]-1-dirty[1]][dirty[0]]="D"
        for (var k=0; k<cleaned_spot_is.length; k++) {
            if (j==cleaned_spot_is[k]) { cont=true }
        }
        if (cont) {
            dirty = by_line[j+2].split(" ")
            map[rs[1]-1-dirty[1]][dirty[0]]="C"
        }
    }
    map[rs[1]-1-position[1]][position[0]] = "H"
    console.log(map)
}

// MAIN - cleaning the room
// Clean the room. Loop through directions, move hoover, loop through dirt spots, add to clean_count if dirt at new spot
if (graphic_mode) {
    terminalPic(by_line, position, 0, [], num_dirt_spots)
}
for (var i = 0; i < directions.length; i++) {
    var temp_position = subtractArray(position,directionToArray(directions[i]))
    // if move made it go out of room, keep old position
    if (temp_position[0]==-1 || temp_position[0]==rs[0] || temp_position[1]==-1 || temp_position[1]==rs[1]) {
        //dont move
    } else {
        position = temp_position 
    }
    //console.log(position)
    if (isDirty(position)) {
        //console.log("FOUND A DIRTY"+position)
        clean_count++
    }
    if (graphic_mode) {
        terminalPic(by_line, position, clean_count, cleaned_spot_is, num_dirt_spots)
    }
}
console.log(position[0]+" "+position[1])
console.log(clean_count)
