import {Schema,model} from"mongoose";
import {IQuestionnaire} from "../GlobalTypes"

const QuestionnairesSchema = new Schema<IQuestionnaire>({
    title: {
        type: String,
        required:true
    },
    description: {
        type: String,
        required: true

    },
    IdUsuario: {
        type: String,
        ref: "users",
        required: true
    },
});

export const QuestionnairesModel = model ("Questionnaires", QuestionnairesSchema);
