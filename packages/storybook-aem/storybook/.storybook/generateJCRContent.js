// This can be used to generate data in AEM for specific components. 
// View ./sample-stories/cta.data.js file for examples data
const generateJCRContent = async (data, postUrl) => {
    const tokenUrl = 'http://localhost:4501/aem/libs/granite/csrf/token.json';

    try {
        const tokenResponse = await fetch(tokenUrl);
        const tokenJSON = await tokenResponse.json();

        try {
            const postResponse = await fetch(postUrl, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + btoa('admin:admin'),
                    'CSRF-Token': tokenJSON.token
                },
                body: JSON.stringify(data)
            });
            
            if (postResponse.ok) return await postResponse;
            else throw new Error('postResponse Network response was not ok.');

        } catch(postErr) {
            console.log('getMarkupFromComponent postErr:', postErr)
        }
    } catch(err) {
        console.log('getMarkupFromComponent err:', err)
    }
};

export default generateJCRContent;