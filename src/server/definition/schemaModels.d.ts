type CollectionName = 'lineUsers' | 'memeImages';

interface SchemaMode {
    lineUsers: any,
    memeImages: any
}

interface mongoDB {
    findQuery: Function,
    findOneQuery: Function,
    create: Function,
    findOneAndUpdate: Function,
    update: Function,
    remove: Function,
}