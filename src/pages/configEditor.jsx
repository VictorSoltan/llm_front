import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ConfigEditor() {

    const [prompts, setPrompts] = useState(null)

    useEffect(() => {
        axios.get(process.env.REACT_APP_BACK_ADDRESS + '/get_prompts')
        .then(res => {
            console.log(res.data);
            setPrompts(res.data.prompts);
        })
        .catch(err => {
            console.log(err);
        })  
    }, [])

    const updatePrompts = (e) => {
        e.preventDefault();
        const requestData = {
            
            systemRole: e.target.systemRole.value,
            basicSystemRoleAfterManagersContact: e.target.basicSystemRoleAfterManagersContact.value,
            servicesAbout: e.target.servicesAbout.value,
            goodbyeAfter3minutesOfWaiting: e.target.goodbyeAfter3minutesOfWaiting.value,
            checkPublicMessage: e.target.checkpublicmessage.value,
            exchangingPairs: e.target.exchangingPairs.value,
            beforeMakeDeal: e.target.beforeMakeDeal.value,
            toMakeADeal: e.target.toMakeADeal.value,
            afterDeal: e.target.afterDeal.value,
            currencyValues: e.target.currencyValues.value,
            summaryPassInfo: e.target.summaryPassInfo.value,
            summaryPassInfoForUser: e.target.summaryPassInfoForUser.value,
            summaryPassQuestion: e.target.summaryPassQuestion.value,
            summaryPassQuestionForUser: e.target.summaryPassQuestionForUser.value,
            summaryPassSum: e.target.summaryPassSum.value,
            summaryPassSumForUser: e.target.summaryPassSumForUser.value,
            summaryPassUser: e.target.summaryPassUser.value,
            summaryPassUserForUser: e.target.summaryPassUserForUser.value,
            summaryPassManagers: e.target.summaryPassManagers.value,
            summaryPassManagersForUser: e.target.summaryPassManagersForUser.value,

            greetingsEn: e.target.greetingsEn.value,
            greetingsRu: e.target.greetingsRu.value,

            allowedGroups: e.target.allowedGroups.value,
            messagesCount: Number(e.target.messagesCount.value),
            messagesCountInDeal: Number(e.target.messagesCountInDeal.value),
            timeAfterUserCanSpeakAfterMessagesLimit: Number(e.target.timeAfterUserCanSpeakAfterMessagesLimit.value),
            timeAfterUserCanMakeNewDeal: Number(e.target.timeAfterUserCanMakeNewDeal.value),
            timeAfterUserCanContactManagersAgain: Number(e.target.timeAfterUserCanContactManagersAgain.value),
            timeAfterUserCanSpeakAfterInappropriateBehavior: Number(e.target.timeAfterUserCanSpeakAfterInappropriateBehavior.value)
        };
        console.log(requestData);
        axios
          .post(process.env.REACT_APP_BACK_ADDRESS + '/update_prompts', requestData)
          .then(response => {
            console.log(response.data);
            alert('Config updated successfully')
          })
          .catch(error => {
            console.error(error);
          });
    };


    function editPromptValue(e, key){
        setPrompts({...prompts, [key]: {...prompts.key, [e.target.name]: e.target.value}})
    }


    function promptDisplay(title, name, prompt, key){
       return(
        <label
        style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            width: '100%',
            marginTop: '10px'
        }}> 
            {title}
            <textarea style={{height: '60px', width: '100%', marginTop: '10px'}} type="text" name={name} value={prompt} onChange={ e => editPromptValue(e, key)} />
        </label>
       ) 
    }  

    return (
        <div
        style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            width: '55%',
            margin: '20px auto 40px auto',
        }}>
            <h1 style={{
                marginBottom: '0px'
            }}>Config Editor</h1>
            {prompts && 
                <form onSubmit={updatePrompts}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '98%',
                        marginLeft: '2%'
                    }}>
                    <h2>Config params</h2>
                    {promptDisplay('System Role:', "systemRole", prompts.botPrompts.systemRole, "botPrompts")}
                    {promptDisplay('System Role After Managers Contact:', "basicSystemRoleAfterManagersContact", prompts.botPrompts.basicSystemRoleAfterManagersContact, "botPrompts")}
                    {promptDisplay('Services About:', "servicesAbout", prompts.botPrompts.servicesAbout, "botPrompts")}
                    {promptDisplay('Goodbye After 3 Minutes Of Waiting:', "goodbyeAfter3minutesOfWaiting", prompts.botPrompts.goodbyeAfter3minutesOfWaiting, "botPrompts")}
                    
                    <h2>Bot prompts</h2>
                    {promptDisplay('Check Public Message:', "checkpublicmessage", prompts.botPrompts.checkPublicMessage, "botPrompts")}
                    {promptDisplay('Exchanging Pairs:', "exchangingPairs", prompts.botPrompts.exchangingPairs, "botPrompts")}
                    {promptDisplay('Before Make Deal:', "beforeMakeDeal", prompts.botPrompts.beforeMakeDeal, "botPrompts")}
                    {promptDisplay('To Make A Deal:', "toMakeADeal", prompts.botPrompts.toMakeADeal, "botPrompts")}
                    {promptDisplay('After Deal:', "afterDeal", prompts.botPrompts.afterDeal, "botPrompts")}
                    {promptDisplay('Currency Values:', "currencyValues", prompts.botPrompts.currencyValues, "botPrompts")}
                    {promptDisplay('Summary Pass Info:', "summaryPassInfo", prompts.botPrompts.summaryPassInfo, "botPrompts")}
                    {promptDisplay('Summary Pass Info For User:', "summaryPassInfoForUser", prompts.botPrompts.summaryPassInfoForUser, "botPrompts")}
                    {promptDisplay('Summary Pass Question:', "summaryPassQuestion", prompts.botPrompts.summaryPassQuestion, "botPrompts")}
                    {promptDisplay('Summary Pass Question For User:', "summaryPassQuestionForUser", prompts.botPrompts.summaryPassQuestionForUser, "botPrompts")}
                    {promptDisplay('Summary Pass Sum:', "summaryPassSum", prompts.botPrompts.summaryPassSum, "botPrompts")}
                    {promptDisplay('Summary Pass Sum For User:', "summaryPassSumForUser", prompts.botPrompts.summaryPassSumForUser, "botPrompts")}
                    {promptDisplay('Summary Pass User:', "summaryPassUser", prompts.botPrompts.summaryPassUser, "botPrompts")}
                    {promptDisplay('Summary Pass User For User:', "summaryPassUserForUser", prompts.botPrompts.summaryPassUserForUser, "botPrompts")}
                    {promptDisplay('Summary Pass Managers:', "summaryPassManagers", prompts.botPrompts.summaryPassManagers, "botPrompts")}
                    {promptDisplay('Summary Pass Managers For User:', "summaryPassManagersForUser", prompts.botPrompts.summaryPassManagersForUser, "botPrompts")}

                    <h2>Languages</h2>
                    {promptDisplay('Greetings En:', "greetingsEn", prompts.botPromptsLanguages.greetingsEn, "botPromptsLanguages")}
                    {promptDisplay('Greetings Ru:', "greetingsRu", prompts.botPromptsLanguages.greetingsRu, "botPromptsLanguages")}

                    <h2>Telegram configs</h2>

                    {promptDisplay('Allowed Groups:', "allowedGroups", prompts.programmingVariables.allowedGroups, "programmingVariables")}
                    {promptDisplay('Messages Count:', "messagesCount", prompts.programmingVariables.messagesCount, "programmingVariables")}
                    {promptDisplay('Messages Count In Deal:', "messagesCountInDeal", prompts.programmingVariables.messagesCountInDeal, "programmingVariables")}
                    {promptDisplay('Time After User Can Speak After Messages Limit:', "timeAfterUserCanSpeakAfterMessagesLimit", prompts.programmingVariables.timeAfterUserCanSpeakAfterMessagesLimit, "programmingVariables")}
                    {promptDisplay('Time After User Can Make New Deal:', "timeAfterUserCanMakeNewDeal", prompts.programmingVariables.timeAfterUserCanMakeNewDeal, "programmingVariables")}
                    {promptDisplay('Time After User Can Contact Managers Again:', "timeAfterUserCanContactManagersAgain", prompts.programmingVariables.timeAfterUserCanContactManagersAgain, "programmingVariables")}
                    {promptDisplay('Time After User Can Speak After Inappropriate Behavior:', "timeAfterUserCanSpeakAfterInappropriateBehavior", prompts.programmingVariables.timeAfterUserCanSpeakAfterInappropriateBehavior, "programmingVariables")}
                    
                    
                    <button style={{
                        width: '500px',
                        marginTop: '30px',
                        height: '50px',
                        fontSize: '20px',
                        fontWeight: 'bold',
                        borderRadius: '10px',
                        borderWidth: '0px',
                        backgroundColor: '#4CAF50',
                        color: 'white',

                    }}
                    type="submit">Save and Restart bots</button>
                </form>
            }
        </div>
    );
}
