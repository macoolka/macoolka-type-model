import i18n from '../'
describe('i18n',()=>{
    it('macoolka.data-model.idRepeat',()=>{
      const result= i18n([{id:'macoolka.data-model.idRepeat',value:{model:'test',name:'name'}}])({})
      expect(result).toMatchSnapshot()
    })
})