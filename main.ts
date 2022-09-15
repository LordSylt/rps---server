radio.onReceivedNumber(function (receivedNumber) {
    if (Gamestate == 1) {
        basic.showIcon(IconNames.House)
        if (receivedNumber >= 0 && receivedNumber <= 255) {
            PlayerIDList.push(receivedNumber)
        }
        if (PlayerIDList.length == 2) {
            if (PlayerIDList[0] != PlayerIDList[1]) {
                radio.sendValue("A", PlayerIDList[0])
                basic.pause(100)
                radio.sendValue("B", PlayerIDList[1])
                basic.showLeds(`
                    . . # . .
                    . . # . .
                    # # # # #
                    . . # . .
                    . . # . .
                    `)
                Gamestate += 1
            } else {
                radio.sendValue("Restart", PlayerIDList[0])
                basic.showLeds(`
                    # . . . #
                    . # . # .
                    . . # . .
                    . # . # .
                    # . . . #
                    `)
            }
        }
    }
})
input.onButtonPressed(Button.AB, function () {
    if (Gamestate == 0) {
        basic.showLeds(`
            . # # . .
            . # . # .
            . # # . .
            . # . . .
            . # . . .
            `)
        Gamestate += 1
    }
})
radio.onReceivedValue(function (name, value) {
    if (Gamestate == 2) {
        if (value == PlayerIDList[0] && name == "R") {
            PAStatus = true
            PAChoice = 1
        }
        if (value == PlayerIDList[0] && name == "P") {
            PAStatus = true
            PAChoice = 2
        }
        if (value == PlayerIDList[0] && name == "S") {
            PAStatus = true
            PAChoice = 3
        }
        if (value == PlayerIDList[1] && name == "R") {
            PBStatus = true
            PBChoice = 1
        }
        if (value == PlayerIDList[1] && name == "P") {
            PBStatus = true
            PBChoice = 2
        }
        if (value == PlayerIDList[1] && name == "S") {
            PBStatus = true
            PBChoice = 3
        }
        if (PAStatus == true && PBStatus == true) {
            basic.showLeds(`
                # . . . #
                . . # . .
                . # . # .
                . . # . .
                # . . . #
                `)
            Gamestate += 1
        }
        if (Gamestate == 4) {
            basic.showIcon(IconNames.Giraffe)
            if (name == "Monkey" && value == (PlayerIDList[0] || PlayerIDList[1])) {
                Gamestate += 1
                basic.showIcon(IconNames.Tortoise)
            }
        }
        if (Gamestate == 5) {
            if (name == "Monkey" && value == (PlayerIDList[0] || PlayerIDList[1])) {
                Gamestate += 1
                basic.showIcon(IconNames.TShirt)
            }
        }
    }
})
let PBChoice = 0
let PAChoice = 0
let PlayerIDList: number[] = []
let PBStatus = false
let PAStatus = false
let Gamestate = 0
basic.showLeds(`
    . # . # .
    . # . # .
    . # # # .
    . # . # .
    . # . # .
    `)
Gamestate = 0
let ShakeCount = 0
radio.setGroup(214)
radio.setTransmitPower(7)
PAStatus = false
PBStatus = false
PlayerIDList = []
basic.forever(function () {
    if (Gamestate == 3) {
        basic.showLeds(`
            . # # # .
            . . . # .
            . . # # .
            . . . # .
            . # # # .
            `)
        radio.sendValue("Shake", PlayerIDList[0])
        radio.sendValue("Shake", PlayerIDList[1])
        Gamestate += 1
    }
})
