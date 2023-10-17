import {readFile, writeFile} from 'fs/promises';

const monsterFile = await readMonsters();
const monsterData = await createMonsterFile(monsterFile);
writeToFile(monsterData);

async function createMonsterFile(monsterFile) {
    // DrakSlime  45 13 16 10 13  8 20 16 BeDragon  FireAir   SuckAir Slime
    return monsterFile.toString().split('\n').map( (monster) => {
        const params = monster.split(/\W+/);
        return {
            name: params[0],
            levelLimit: params[1],
            growth: params[2],
            hp: params[3],
            mp: params[4],
            attack: params[5],
            defense: params[6],
            agility: params[7],
            intelligence: params[8],
            skill1: params[9],
            skill2: params[10],
            skill3: params[11],
            family: params[12]
        };
    });
}

async function readMonsters() {
    try {
        const monsters = await readFile('monster_data.txt', 'utf-8');
        return monsters;
    } catch (error) {
        console.log(error);
    }
}

async function writeToFile(data) {
    try {
        await writeFile('monster_json.txt', JSON.stringify(data));
        console.log("file written successfully!");
    } catch (error) {
        console.log(error);
    }
}