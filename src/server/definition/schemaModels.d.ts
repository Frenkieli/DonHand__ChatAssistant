type CollectionName = 'lineUsers' | 'memeImages';

interface SchemaMode {
    lineUsers: any,
    memeImages: any
}

interface mongoDB {
    findOneQuery: Function,
    create: Function,
    findOneAndUpdate: Function,
    update: Function,
}