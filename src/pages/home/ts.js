async function prepareData(history, windowSize) {
    const data = [];
    const labels = [];

    for (let i = 0; i <= history.length - windowSize - 1; i++) {
        const inputSequence = history.slice(i, i + windowSize);
        const outputSequence = history[i + windowSize];
        data.push(inputSequence.flat());
        labels.push(outputSequence);
    }

    return { data, labels };
}

async function createModel(inputShape) {
    const model = tf.sequential();
    model.add(tf.layers.lstm({ units: 50, inputShape, returnSequences: false }));
    model.add(tf.layers.dropout({ rate: 0.2 }));
    model.add(tf.layers.dense({ units: 7, activation: 'sigmoid' }));
    model.compile({ loss: 'meanSquaredError', optimizer: 'adam', metrics: ['accuracy'] });
    return model;
}

async function trainModel(model, data, labels) {
    const xs = tf.tensor2d(data);
    const ys = tf.tensor2d(labels);
    await model.fit(xs, ys, { epochs: 100, batchSize: 32 });
}

async function predictNextDraw(model, lastDraws, windowSize) {
    const input = lastDraws.flat();
    const inputTensor = tf.tensor2d([input]);
    const prediction = model.predict(inputTensor);
    const predictedNumbers = await prediction.data();
    return Array.from(predictedNumbers);
}

async function run() {
    const history = [
        /* Example data: replace with your actual lottery history */
        [1, 2, 3, 4, 5, 6, 7],
        [8, 9, 10, 11, 12, 13, 14],
        // Add more historical draws here...
    ];

    const windowSize = 5; // Number of past draws to use as input for predictions
    const { data, labels } = await prepareData(history, windowSize);

    const model = await createModel([windowSize * 7]);
    await trainModel(model, data, labels);

    const lastDraws = history.slice(-windowSize); // Get the last 'windowSize' draws for prediction
    const predictedNextDraw = await predictNextDraw(model, lastDraws, windowSize);
    console.log('Predicted Next Draw:', predictedNextDraw.map(num => Math.round(num)));
}

run().catch(console.error);