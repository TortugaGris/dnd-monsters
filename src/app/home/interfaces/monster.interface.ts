export interface Monster {
  index: string;
  name: string;
  url: string;
  desc: string[];
  charisma: number;
  constitution: number;
  dexterity: number;
  intelligence: number;
  stregth: number;
  wisdom: number;
  image: string;
  size: string;
  type: string;
  subtype: string;
  alignments: string;
  armor_class: object[];
  hit_points: number;
  hit_dice: string;
  hit_points_roll: string;
  actions: Action[];
  legendary_actions: Action[];
  challege_rating: number;
  condition_immunities: APIReference[];
  damage_immunities: string[];
  damage_resistances: string[];
  damage_vulnerabilities: string[];
  forms: APIReference[];
  languages: string;
  proficiencies: Proficiency[];
  reactions: Action[];
  senses: Senses;
  special_abilities: SpecialAbilities[];
  speed: Speed;
  xp: number;
}

export interface Action {
  name: string;
  desc: string;
  actions_options: Choice;
  actions: ActionItem[];
  options: Choice;
  multiattack_type: string;
  attack_bonus: number;
  dc: DC;
  attacks: Attack[];
  damage: Damage;
}

export interface Choice {
  desc: string;
  choose: number;
  type: string;
}

export interface ActionItem {
  action_name: string;
  count: number;
  type: string;
}

export interface DC {
  dc_type: APIReference;
  dc_value: number;
  success_type: string;
}

export interface APIReference {
  index: string;
  name: string;
  url: string;
}

export interface Attack {
  name: string;
  dc: DC;
  damage: Damage;
}

export interface Damage {
  damage_dice: string;
  damage_type: APIReference;
}

export interface Proficiency {
  value: number;
  proficiency: APIReference;
}

export interface Senses {
  passive_perception: number;
  blindsight: string;
  darkvision: string;
  tremorsense: string;
  truesight: string;
}

export interface SpecialAbilities {
  name: string;
  desc: string;
  attack_bonus: number;
  damage: Damage;
  dc: DC;
  spellcasting: SpellCasting;
  usage: Usage;
}

export interface SpellCasting {
  ability: APIReference;
  dc: number;
  modifier: number;
  components_required: string[];
  school: string;
  slots: object;
  spells: Spell;
}

export interface Spell {
  name: string;
  level: number;
  url: string;
  usage: Usage;
}

export interface Usage {
  type: string;
  rest_types: string[];
  times: number;
}

export interface Speed {
  walk: string;
  burrow: string;
  climb: string;
  fly: string;
  swim: string;
}
