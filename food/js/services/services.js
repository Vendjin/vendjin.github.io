// функция с каким то асинхронным кодом используем асинхрон, для того что бы загружать/выгружать данные
const postData = async (url, dataJSON) => {
    // await - ожидает пока вернется результат запроса
    const result = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: dataJSON
    });

    // .json() – декодирует ответ в формате JSON в обычный js object,
    // тоже ждем пока распарсится json и только потом его вернем
    return await result.json();
};


// получить данные из db.json из меню
// const getResource = async (url) => {
async function getResource(url) {
    const result = await fetch(url);

    if (!result.ok) {
        throw new Error(`Could not fetch ${url}, status: ${result.status}`);
    }

    return await result.json();
}


export {postData};
export {getResource};

