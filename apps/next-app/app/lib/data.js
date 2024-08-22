import config from '../../config';

export async function fetchFilterPrices(code, name, commerce, page, limit, startDate, endDate) {

    // Crear el objeto con los datos a enviar en el cuerpo de la solicitud
    const bodyData = {
        code,
        name,
        commerce,
        page,
        limit,
        startDate,
        endDate,
    };

    // Realizar la solicitud POST con el body en formato JSON
    const response = await fetch(
        `${config.serverUrl}prices/filter`, // URL del servidor
        {
            method: 'POST',                // Método HTTP POST
            headers: {
                'Content-Type': 'application/json', // Especifica que el contenido es JSON
            },
            body: JSON.stringify(bodyData) // Convertir el objeto bodyData a una cadena JSON
        }
    );

    // Manejo de errores
    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }

    // Convertir la respuesta a JSON
    const data = await response.json();


    return data;
}


export async function fetchPricesFiles() {
    // Realizar la solicitud GET
    const response = await fetch(
        `${config.serverUrl}files/prices`
    );


    // Manejo de errores
    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }

    // Convertir la respuesta a JSON
    const data = await response.json();

    return data;
}


export async function fetchFilteredProducts(code, name, familiy, limit, page, hasPrices) {
    // Crear el objeto con los datos a enviar en el cuerpo de la solicitud
    
    const bodyData = {
        hasPrices: hasPrices, page: page, limit:limit, nameFilter: name, codeFilter: code, familyFilter: familiy, 
    };

    // Realizar la solicitud POST con el body en formato JSON
    const response = await fetch(
        `${config.serverUrl}products/filter`, // URL del servidor
        {
            method: 'POST',                // Método HTTP POST
            headers: {
                'Content-Type': 'application/json', // Especifica que el contenido es JSON
            },
            body: JSON.stringify(bodyData) // Convertir el objeto bodyData a una cadena JSON
        }
    );



    // Manejo de errores
    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }

    // Convertir la respuesta a JSON
    const data = await response.json();
}

export async function fetchProductsFiles() {
    try {
        const response = await fetch(
            `${config.serverUrl}files/products`
        );
        const data = await response.json();
        return data;
    } catch (err) {
        return err;

    }
}

export async function deleteProductFile(filename) {
    try {
        const response = await fetch(
            `${config.serverUrl}files/products/delete`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ filename }),
            }
        );
        const data = await response.json();
        return data;
    } catch (err) {
        return err;
    }
}