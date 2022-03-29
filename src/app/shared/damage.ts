export interface Damage {
    [signature: string]: string | any,
    basicAtkDmg: {
        min: number,
        max: number,
        extra: string,
    },
    skillAtkDmg: {
        min: number,
        max: number,
        extra: string,
    },
    hyperAtkDmg: {
        min: number,
        max: number,
        extra: string,
    },
    passive?: string
}