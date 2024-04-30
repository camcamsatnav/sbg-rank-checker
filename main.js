// profiles[3].members.6994c547f53e4107ace4a0bb48609bb5.leveling.experience



// maybe player_data
async function guildCall() {
    const response = await fetch(`https://api.hypixel.net/v2/guild?id=5fea32eb8ea8c9724b8e3f3c`, {
        method: "GET",
        headers: {
            "Api-Key": "e48ec7a3-df20-409c-954e-f4537044cce1"
        },
    });
    const data = await response.json();
    return data;
}

async function getProfiles(uuid) {
    try {
        const response = await fetch(`https://api.hypixel.net/v2/skyblock/profiles?uuid=${uuid}`, {
            method: "GET",
            headers: {
                "Api-Key": "e48ec7a3-df20-409c-954e-f4537044cce1"
            },
        });
        return await response.json();
        // await console.log(body.profiles[3].members["6994c547f53e4107ace4a0bb48609bb5"].leveling.experience);
    } catch (e) {
        return;
    }
}
async function memberGrab(data) {
    const playerData = [];
    for (let i = 0; i < data.guild.members.length; i++) {
        if (data.guild.members[i].rank === "Staff" || data.guild.members[i].rank === "Guild Master") continue;
        playerData.push({
            uuid: data.guild.members[i].uuid,
            rank: data.guild.members[i].rank
        });
    }
    return playerData;
}

async function getHighest(data) {
    let highest = -1;
    for (let j = 0; j < data.sbdata.profiles.length; j++) {
        if (data.sbdata.profiles[j].members[data.uuid].leveling?.experience > highest) {
            highest = data.sbdata.profiles[j].members[data.uuid].leveling?.experience
        }
    }
    return highest;
}

async function main() {
    const data = await guildCall();
    let playerData = await memberGrab(data);
    for (let i = 0; i < playerData.length; i++) {
        const sbdata = await getProfiles(playerData[i].uuid);
        playerData[i] = { ...playerData[i], sbdata };
        const highest = await getHighest(playerData[i])
        playerData[i] = { ...playerData[i], "level": highest }
    }
    playerData.sort((a,b) => b.level - a.level);
    const toChange = [];
    for (let i = 0; i < 5; i++) {
        if (playerData[i].rank === "Skyblock God") continue;
        toChange.push({"uuid": playerData[i].uuid, "rank": "Skyblock God"});
    }
    for (let i = 5; i < 20; i++) {
        if (playerData[i].rank === "Skyblock King") continue;
        toChange.push({"uuid": playerData[i].uuid, "rank": "Skyblock King"})
    }
    for (let i = 20; i < 60; i++) {
        if (playerData[i].rank === "Elite") continue;
        toChange.push({"uuid": playerData[i].uuid, "rank": "Elite"})
    }
    for (let i = 60; i < playerData.length; i++) {
        if (playerData[i].rank === "Member") continue;
        toChange.push({"uuid": playerData[i].uuid, "rank": "Member"})
    }


    console.log(toChange);
    console.log(toChange.length);

    // let uuid = "6994c547f53e4107ace4a0bb48609bb5";
    // const profiles = getJSON(uuid);
}


main();

