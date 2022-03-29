import { SkillElement } from "./skill-element";
import { MainElement } from "./main-element";
import { Skill } from "./skill";

interface Elements {
    [signature: string]: string | any, // TODO: its probably really bad to do it like this. fix it I guess?
    main?: MainElement,
    basic?: SkillElement,
    skill?: SkillElement,
    hyper?: SkillElement,
    passive?: SkillElement
}

export interface Composition {
    [init: string]: number | Elements | Skill | undefined,
    level?: number,
    attack?: number,
    health?: number,
    speed?: number,
    crit?: number,
    passive?: {
        level: number,
        atk: number,
        hp: number
    },
    basicAtk?: Skill,
    skillAtk?: Skill,
    hyperAtk?: Skill,
    elements: Elements
}