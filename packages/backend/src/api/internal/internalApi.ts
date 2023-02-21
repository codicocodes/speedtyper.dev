import { internalApiFactory } from "./utils/internalApiFactory";
import User from "../../models/user";
import ChallengeResult from "../../models/challengeResult";

export const streamAllUsers = internalApiFactory(User);

export const streamAllResults = internalApiFactory(ChallengeResult);
