export interface Hero {
    [index: string]: string | any,
    name: string,
    image: string,
    faction: string,
    rarity: string,
    basicAtk?: any, // TODO: add type for this one
    skillAtk?: any,
    hyperAtk?: any
}