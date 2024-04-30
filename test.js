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

async function main() {
    const data = await guildCall();
    let playerData = await memberGrab(data);
    for (let i = 0; i < 2; i++) {
        const sbdata = await getProfiles(playerData[i].uuid);
        playerData[i] = { ...playerData[i], sbdata };
    }



    console.log(playerData);
    console.log(playerData.length);

    // let uuid = "6994c547f53e4107ace4a0bb48609bb5";
    // const profiles = getJSON(uuid);
}


main();

