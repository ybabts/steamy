export const endpoint = 'https://api.steampowered.com/'

export * as IDota2Match from './IDota2Match.ts';
export * as IDota2MatchStats from './IDota2MatchStats.ts';

export enum GameMode {
  None,
  AllPick,
  CaptainsMode,
  RandomDraft,
  SingleDraft,
  AllRandom,
  Intro,
  Diretide,
  ReverseCaptainsMode,
  TheGreeviling,
  Tutorial,
  MidOnly,
  LeastPlayed,
  NewPlayerPool,
  CompendiumMatchmaking,
  CaptainsDraft = 16
}

export enum Skill {
  Any,
  Normal,
  High,
  VeryHigh
}

export enum Status {
  /** @description Success */
  Success = 1,
  /** @description Cannot get match history for a user that hasn't allowed it. */
  Private = 15
}

export enum LobbyType {
  Invalid = -1,
  PublicMatchmaking = 0,
  Practise = 1,
  Tournament = 2,
  Tutorial = 3,
  CoopWithBots = 4,
  TeamMatch = 5,
  SoloQueue = 6,
  RankedMatchmaking = 7,
  SoloMid1v1 = 8
}

export enum LeaverStatus {
  NONE = 0,
  DISCONNECTED = 1,
  DISCONNECTED_TOO_LONG = 2,
  ABANDONED = 3,
  AFK = 4,
  NEVER_CONNECTED = 5,
  NEVER_CONNECTED_TOO_LONG = 6,
}

export enum Engine {
  SOURCE1,
  SOURCE2
}