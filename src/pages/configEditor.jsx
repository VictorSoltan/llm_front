import React, { useState, useEffect, useRef, useCallback } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import axios from 'axios';

export default function ConfigEditor() {

    const [prompts, setPrompts] = useState(null),
    [inputs, setInputs] = useState([]),
    [newGroup, setNewGroup] = useState(null),
    [newGroupToJoin, setNewGroupToJoin] = useState(""),
    [keysAndGreetings, setKeysAndGreetings] = useState(""),
    addGroupToJoinInput = useRef(null),
    addGroupInput = useRef(null);


    useEffect(() => {
        axios.get(process.env.REACT_APP_BACK_ADDRESS + '/get_prompts')
        .then(res => {
            console.log(res.data);
            setPrompts(res.data.prompts);
            setKeysAndGreetings(res.data.prompts.keysAndGreetings);
        })
        .catch(err => {
            console.log(err);
        })  
    }, [])
    
    useEffect(() => {
        if (!keysAndGreetings) return;
        const newInputs = keysAndGreetings.map(() => React.createRef());
        setInputs(newInputs);
    }, [keysAndGreetings]);

    const updatePrompts = useCallback((e) => {
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
            summaryPassInfo: e.target.summaryPassInfo.value,
            summaryPassInfoForUser: e.target.summaryPassInfoForUser.value,
            summaryPassQuestion: e.target.summaryPassQuestion.value,
            summaryPassQuestionForUser: e.target.summaryPassQuestionForUser.value,
            summaryPassUser: e.target.summaryPassUser.value,
            summaryPassUserForUser: e.target.summaryPassUserForUser.value,
            summaryPassManagers: e.target.summaryPassManagers.value,
            summaryPassManagersForUser: e.target.summaryPassManagersForUser.value,

            faqGroup: prompts.programmingVariables.faqGroup,
            adminGroup: prompts.programmingVariables.adminGroup,
            groupsToAddBots: prompts.programmingVariables.groupsToAddBots,
            allowedGroups: prompts.programmingVariables.allowedGroups,
            messagesCount: Number(e.target.messagesCount.value),
            messagesCountInDeal: Number(e.target.messagesCountInDeal.value),
            timeAfterUserCanSpeakAfterMessagesLimit: Number(e.target.timeAfterUserCanSpeakAfterMessagesLimit.value),
            timeAfterUserCanMakeNewDeal: Number(e.target.timeAfterUserCanMakeNewDeal.value),
            timeAfterUserCanContactManagersAgain: Number(e.target.timeAfterUserCanContactManagersAgain.value),
            timeAfterUserCanSpeakAfterInappropriateBehavior: Number(e.target.timeAfterUserCanSpeakAfterInappropriateBehavior.value),

            keysAndGreetings: keysAndGreetings
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
    }, [prompts, keysAndGreetings])


    function editPromptValue(e, key){
        console.log(e.target.name)
        setPrompts({...prompts, [key]: {...prompts[key], [e.target.name]: e.target.value}})
    }


    function promptDisplay(title, name, prompt, key){
        return(
            <div className='flex w-full flex-col items-start mt-4'>
                <label className='pr-4 border-b-2 border-slate-300 mb-1'>
                    {title}
                </label>
                <TextareaAutosize maxRows={5} className='w-full border-b-2 border-l-2 p-1 border-slate-400' style={{height: '60px', marginTop: '10px'}} type="text" name={name} value={prompt} onChange={ e => editPromptValue(e, key)} />
            </div>
        ) 
    }  



    const addGroup = (e, key, value) => {
        e.preventDefault()
        // add value in array of allowed groups
        if(!Number(newGroup)) return
        setPrompts({...prompts, [key]: {...prompts[key], [value]: [...prompts.programmingVariables.allowedGroups, Number(newGroup)] } })


    }
    const addGroupToJoin = (e, key, value) => {
        e.preventDefault()
        if(!newGroupToJoin) return
        // add value in array of allowed groups
        setPrompts({...prompts, [key]: {...prompts[key], [value]: [...prompts.programmingVariables.groupsToAddBots, newGroupToJoin] } })
        setNewGroupToJoin("")
    }
    const deleteGroup = (e, key, value, elem) => {
        e.preventDefault()
        setPrompts({...prompts, [key]: {...prompts[key], [value]: [...prompts.programmingVariables[value].filter(group => group !== elem)] } })
    }




    const handleGreetingChange = (e, index) => {
        e.preventDefault()
        let updatedKeys = keysAndGreetings.map((item, i) => {
           if (i === index) {
               return {...item, greeting: e.target.value};
           } else {
                return item;
           }
        });
    
        setKeysAndGreetings(updatedKeys);
    }

    const addElem = (e, index) => {
        e.preventDefault()
        if(!inputs[index].current.value) return
        const value = inputs[index].current.value;
        let updatedKeys = keysAndGreetings.map((item, i) => {
          if (i === index) {
            return { ...item, keysWords: [...item.keysWords, value] };
          } else {
            return item;
          }
        });
      
        setKeysAndGreetings(updatedKeys);
        inputs[index].current.value = '';
      };

    const addItemToKeysAndGreetings = (e) => {
        e.preventDefault()
        setKeysAndGreetings([...keysAndGreetings, {greeting: '', keysWords: []}])
    }

    const deleteItemFromKeysAndGreetings  = (e, elem) => {
      e.preventDefault()
      if(!window.confirm('Are you sure you want to delete this item?')) return
      setKeysAndGreetings([...keysAndGreetings.filter(item => item !== elem)])
    }

    const deleteKeyWordFromGreetings = (e, index, item) => {
      e.preventDefault()
      console.log(keysAndGreetings[index].keysWords.filter(word => word !== item))
      let newKeysAndGreetings = [...keysAndGreetings]
      console.log(newKeysAndGreetings)
      for(let i = 0; i < newKeysAndGreetings.length; i++){
          if(i === index){
              newKeysAndGreetings[i].keysWords = newKeysAndGreetings[i].keysWords.filter(word => word !== item)
          }
      }
      setKeysAndGreetings(newKeysAndGreetings)
    }

    const configParams = [
      { title: 'System Role:', name: "systemRole", prompt: prompts?.botPrompts?.systemRole },
      { title: 'System Role After Managers Contact:', name: "basicSystemRoleAfterManagersContact", prompt: prompts?.botPrompts?.basicSystemRoleAfterManagersContact },
      { title: 'Services About:', name: "servicesAbout", prompt: prompts?.botPrompts?.servicesAbout },
      { title: 'Goodbye After 3 Minutes Of Waiting:', name: "goodbyeAfter3minutesOfWaiting", prompt: prompts?.botPrompts?.goodbyeAfter3minutesOfWaiting },
    ];

    const botPrompts = [
      { title: 'Prompt to Check Public Messages in groups:', name: "checkpublicmessage", prompt: prompts?.botPrompts?.checkPublicMessage },
      { title: 'Exchanging Pairs:', name: "exchangingPairs", prompt: prompts?.botPrompts?.exchangingPairs },
      { title: 'Prompt before making deal:', name: "beforeMakeDeal", prompt: prompts?.botPrompts?.beforeMakeDeal },
      { title: 'Prompt to make a deal:', name: "toMakeADeal", prompt: prompts?.botPrompts?.toMakeADeal },
      { title: 'Prompt after user made a deal:', name: "afterDeal", prompt: prompts?.botPrompts?.afterDeal },

  ];

  const summary = [
    { title: 'Summary about deal info:', name: "summaryPassInfo", prompt: prompts?.botPrompts?.summaryPassInfo },
    { title: 'Summary about deal info For User:', name: "summaryPassInfoForUser", prompt: prompts?.botPrompts?.summaryPassInfoForUser },
    { title: 'Summary about Question:', name: "summaryPassQuestion", prompt: prompts?.botPrompts?.summaryPassQuestion },
    { title: 'Summary about Question For User:', name: "summaryPassQuestionForUser", prompt: prompts?.botPrompts?.summaryPassQuestionForUser },
    { title: 'Summary about user behavior:', name: "summaryPassUser", prompt: prompts?.botPrompts?.summaryPassUser },
    { title: 'Summary about user behavior For User:', name: "summaryPassUserForUser", prompt: prompts?.botPrompts?.summaryPassUserForUser },
    { title: 'Summary about request to contact managers:', name: "summaryPassManagers", prompt: prompts?.botPrompts?.summaryPassManagers },
    { title: 'Summary about contacting Managers For User:', name: "summaryPassManagersForUser", prompt: prompts?.botPrompts?.summaryPassManagersForUser },
  ]

  const programmingVariables = [
      { title: 'FAQ public link:',  name: "faqGroup", prompt: prompts?.programmingVariables?.faqGroup },
      { title: 'Admin public link:', name: "adminGroup", prompt: prompts?.programmingVariables?.adminGroup },
      { title: 'Messages Count before cool down:', name: "messagesCount", prompt: prompts?.programmingVariables?.messagesCount },
      { title: 'Messages Count In Deal:', name: "messagesCountInDeal", prompt: prompts?.programmingVariables?.messagesCountInDeal },
      { title: 'Time After User Can Speak After Messages Limit(ms):', name: "timeAfterUserCanSpeakAfterMessagesLimit", prompt: prompts?.programmingVariables?.timeAfterUserCanSpeakAfterMessagesLimit },
      { title: 'Time After User Can Make New Deal(ms):', name: "timeAfterUserCanMakeNewDeal", prompt: prompts?.programmingVariables?.timeAfterUserCanMakeNewDeal },
      { title: 'Time After User Can Contact Managers Again(ms):', name: "timeAfterUserCanContactManagersAgain", prompt: prompts?.programmingVariables?.timeAfterUserCanContactManagersAgain },
      { title: 'Time After User Can Speak After Inappropriate Behavior(ms):', name: "timeAfterUserCanSpeakAfterInappropriateBehavior", prompt: prompts?.programmingVariables?.timeAfterUserCanSpeakAfterInappropriateBehavior },
  ]
  
  return (
        <div
        className='max-w-[1920px] flex flex-col items-start w-[55%] mt-[20px] mb-[40px] m-auto'>
            <h1 className='font-medium text-2xl mb-0'>Config Editor</h1>
            {prompts && 
                <form onSubmit={updatePrompts} className='flex flex-col items-center w-full'>
                    <h2 className='my-5 text-lg'>Config params</h2>
                    {configParams.map((item, index) => {
                        return promptDisplay(item.title, item.name, item.prompt, "botPrompts")
                    })}
                    
                    <h2 className='my-5 text-lg'>Bot prompts</h2>
                    {botPrompts.map((item, index) => {
                        return promptDisplay(item.title, item.name, item.prompt, "botPrompts")
                    })}

                    <h2 className='my-5 text-lg'>Summary for admins and users</h2>
                    {summary.map((item, index) => {
                        return promptDisplay(item.title, item.name, item.prompt, "botPrompts")
                    })}
                    <h2 className='my-5 text-lg'>Key words and greetings</h2>
                    {keysAndGreetings.length > 0 && keysAndGreetings.map((elem, index) => (
                      <div key={index} className='w-full'>
                        <div className='flex items-start'>
                          <TextareaAutosize className='w-full border-b-2 border-l-2 py-1 border-gray-400 my-2' value={elem.greeting} onChange={e => handleGreetingChange(e, index)} />
                          <button className='self-start ml-2 text-red-700'  onClick={e => deleteItemFromKeysAndGreetings(e, elem)}>&#10005;</button>
                        </div>
                        <div className='flex flex-col items-start my-2 gap-y-2'>
                          <div className='flex gap-2 flex-wrap'>
                            {elem.keysWords.length > 0 && elem.keysWords.map((item, indx) => (
                              <div key={indx} className='flex items-center gap-1 py-1 px-2 rounded-lg bg-gray-200'>
                                <p>{item}</p>
                                <button onClick={e => deleteKeyWordFromGreetings(e, index, item)}>&#10005;</button>
                              </div>
                            ))}
                          </div>
                          <div className='flex gap-2 mt-2'>
                            <input className='border-b-2 border-l-2 border-gray-400' type="text" ref={inputs[index]} />
                            <button className='bg-gray-200 py-2 px-4' onClick={e => addElem(e, index)}>Add elem</button>
                          </div>
                        </div>
                      </div>
                    ))}
                    <button className='ml-2 bg-gray-200 py-2 px-4' onClick={addItemToKeysAndGreetings}>Add item</button>
                    <h2 className='my-5 text-lg'>Telegram configs</h2>
                            
                    <label className='pr-4 border-b-2 border-slate-300 mb-1 self-start'>Link of groups to add observers:</label>

                    <div className='w-full flex gap-2 flex-wrap mt-4'>
                      {prompts.programmingVariables.groupsToAddBots.length > 0 && prompts.programmingVariables.groupsToAddBots.map((group, index) => (
                        <div key={index} className='flex items-center gap-2 py-1 px-2 rounded-lg bg-gray-200'> 
                          <label>{group}</label>
                          <button onClick={e => deleteGroup(e, "programmingVariables", "groupsToAddBots", group)} className='ml-2'>&#10005;</button>
                        </div>
             
                      ))}
                    </div>
                    <div className='w-full flex my-2 justify-between'>
                      <input className='w-[calc(100%_-_140px)] border-b-2 border-l-2 px-2 border-gray-400' placeholder='Add group' onChange={e => setNewGroupToJoin(e.target.value)} ref={addGroupToJoinInput} />
                      <button className='bg-gray-200 py-2 px-4 self-start ml-2 w-[120px]' onClick={e => addGroupToJoin(e, "programmingVariables", "groupsToAddBots")}>add group</button>
                    </div>
                      
                    <label className='pr-4 border-b-2 border-slate-300 mt-4 mb-1 self-start'>Id's of groups where observers must react on messages:</label>

                    <div className='w-full flex gap-2 flex-wrap mt-4'>
                      {prompts.programmingVariables.allowedGroups.length > 0 && prompts.programmingVariables.allowedGroups.map((group, index) => (
                        <div key={index} className='flex  items-center gap-2 py-1 px-2 rounded-lg bg-gray-200'>
                          <label>{group}</label>
                          <button onClick={e => deleteGroup(e, "programmingVariables", "allowedGroups", group)} className='ml-2'>&#10005;</button>
                        </div>
           
                      ))}
                    </div>
                    <div className='w-full flex my-2 justify-between'>
                      <input className='w-[calc(100%_-_140px)] border-b-2 border-l-2 px-2 border-gray-400' placeholder='Add group' onChange={e => setNewGroup(e.target.value)} ref={addGroupInput} />
                      <button className='bg-gray-200 py-2 px-4 self-start my-2 ml-2 w-[120px]' onClick={e => addGroup(e, "programmingVariables", "allowedGroups")}>add group</button>
                    </div>
                      
                    {programmingVariables.map((item, index) => {
                        return promptDisplay(item.title, item.name, item.prompt, "programmingVariables")
                    })}

                    <button 
                    className='mt-4 bg-green-500 py-2 px-4 my-2 text-white text-lg rounded-lg self-center'
                    type="submit">Save and Restart bots</button>
                </form>
            }
        </div>
    );
}
