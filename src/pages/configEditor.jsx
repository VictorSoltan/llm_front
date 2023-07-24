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
            systemRole: e.target.systemrole.value,
            servicesAbout: e.target.servicesabout.value,
            goodbyeAfter3minutesOfWaiting: e.target.goodbyeafter3minutesofwaiting.value,
            checkPublicMessage: e.target.checkpublicmessage.value,

            privateMessagesGptReminder: e.target.privatemessagesgptreminder.value,
            afterConversetionPassedToAdmins: e.target.afterconversetionpassedtoadmins.value,
            conversationSummery: e.target.conversationsummery.value,
            currencyValues: e.target.currencyvalues.value,
            currencyPairs: e.target.currencypairs.value,
            greetingsEn: e.target.greetingsen.value,
            greetingsRu: e.target.greetingsru.value,
            messageAfterItWasPassedEn: e.target.passedrequestmessageen.value,
            messageAfterItWasPassedRu: e.target.passedrequestmessageru.value,

            allowedGroups: e.target.allowedgroups.value,

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
                    {promptDisplay('System Role:', "systemrole", prompts.botPrompts.systemrole, "botPrompts")}
                    {promptDisplay('Services About:', "servicesabout", prompts.botPrompts.servicesabout, "botPrompts")}
                    {promptDisplay('Goodbye After 3 Minutes Of Waiting:', "goodbyeafter3minutesofwaiting", prompts.botPrompts.goodbyeafter3minutesofwaiting, "botPrompts")}
                    {promptDisplay('Check Public Message:', "checkpublicmessage", prompts.botPrompts.checkpublicmessage, "botPrompts")}
                    {promptDisplay('Private Message GPT Reminder:', "privatemessagesgptreminder", prompts.botPrompts.privatemessagesgptreminder, "botPrompts")}
                    {promptDisplay('Private Message GPT Reminder one hour after sending message:', "afterconversetionpassedtoadmins", prompts.botPrompts.afterconversetionpassedtoadmins, "botPrompts")}
                    {promptDisplay('Conversation Summery:', "conversationsummery", prompts.botPrompts.conversationsummery, "botPrompts")}
                    {promptDisplay('Amounts to compare with user requests(must be separated with comma and space):', "currencyvalues", prompts.botPrompts.currencyvalues, "botPrompts")}
                    {promptDisplay('currency Pairs:', "currencypairs", prompts.botPrompts.currencypairs, "botPrompts")}

                    <h2>Languages</h2>

                    {promptDisplay('Greeting En:', "greetingsen", prompts.botPromptsLanguages.greetingsen, "botPromptsLanguages")}
                    {promptDisplay('Greeting Ru:', "greetingsru", prompts.botPromptsLanguages.greetingsru, "botPromptsLanguages")}
                    {promptDisplay('Passed Request Message En:', "passedrequestmessageen", prompts.botPromptsLanguages.passedrequestmessageen, "botPromptsLanguages")}
                    {promptDisplay('Passed Request Message Ru:', "passedrequestmessageru", prompts.botPromptsLanguages.passedrequestmessageru, "botPromptsLanguages")}

                    <h2>Telegram configs</h2>
                    {promptDisplay('Allowed Groups(must be separated with comma and space):', "allowedgroups", prompts.programmingVariables.allowedgroups, "programmingVariables")}

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
