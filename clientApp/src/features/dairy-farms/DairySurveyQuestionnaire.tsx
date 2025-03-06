import { Item } from "semantic-ui-react";
import { Dairy } from "../../app/models/dairy";

interface Props {
  dairy: Dairy;
}
export default function DairySurveyQuestionnaire({ dairy }: Props) {
  return (
    <>
      <br />
      <Item.Extra>
        पशु आहार अभी कैसे संभालते है:-
      </Item.Extra>    
      <Item.Description>
          <p>{dairy.fodderManagement} - <i>{dairy.addedByUserName}</i></p>
      </Item.Description>
      {dairy.surveyNutrition?.length > 0 && 
        <>
          <Item.Extra>
            क्या आपको ऐसा लगता है कि हरे चारे से भूसे की तुलना में अधिक पोषण मिलता है:-
          </Item.Extra>
          <Item.Description>
              <p>{dairy.surveyNutrition}</p>
          </Item.Description>
        </>
      }
      {dairy.surveyBetterMilkProduction?.length > 0 && 
        <>
          <Item.Extra>
          क्या आपको ऐसा लगता है कि हरे चारे से पशु के दूध में वृद्धि होती है:-
          </Item.Extra>
          <Item.Description>
              <p>{dairy.surveyBetterMilkProduction}</p>
          </Item.Description>
        </>
      }
      {dairy.surveyBetterFodderManagement?.length > 0 && 
        <>
          <Item.Extra>
          क्या आपको ऐसा लगता है कि हरे चारे के प्रयोग से चूनी चोकर आदि की खपत कम होती है:-
          </Item.Extra>
          <Item.Description>
              <p>{dairy.surveyBetterFodderManagement}</p>
          </Item.Description>
        </>
      }
      {dairy.surveyFodderRequirement?.length > 0 && 
        <>
          <Item.Extra>
          अगर हम आपको प्रतिदिन हरा चारा उपलब्ध कराये तो क्या आप हमसे हरा चारा ख़रीदेंगे? यदि हाँ तोप् रतिदिन लगभग कितने किलो:-
          </Item.Extra>
          <Item.Description>
              <p>{dairy.surveyFodderRequirement}</p>
          </Item.Description>
        </>
      }
    </>
  );
}
