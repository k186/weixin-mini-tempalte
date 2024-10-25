const MODEL_PREFIX = 'pd_';
export default class {
  constructor (modelName, baseModel = {}) {
    this._modelName = `${MODEL_PREFIX}_${modelName}`
    this._baseModel = baseModel;
    this._model = null;
  }
  
  get model () {
    return this._model;
  }
  
  set model (data) {
    
    let result = {...this._baseModel, ...(this._model || {}), ...data}
    this._model = Object.keys(result).length ? result : null;
  }
}
