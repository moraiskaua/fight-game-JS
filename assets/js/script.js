let log = new Log(document.querySelector('.log'));

let char = new Knight('Player');
let enemy = new BigMonster();

const stage = new Stage(
    char,
    enemy,
    document.querySelector('#character'),
    document.querySelector('#enemy'),
    log
);

stage.Start();