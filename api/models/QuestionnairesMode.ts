import {Schema,model} from"mongoose";

interface IQuestionnaire{
    title: String,
    typo: "radio" | "chackbox" | "select" | "text",
    isMandatory:boolean,
    description: string,
    IdUsuario: String,
}

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
        required: true
    },
    typo: {
        type: String,
        enum: ["radio", "checkbox", "select", "text"],
        required: true
    
    },
    isMandatory:{
        type:Boolean,
        required:true
    },
});

export const QuestionnairesModel = model ("Questionnaires", QuestionnairesSchema);
