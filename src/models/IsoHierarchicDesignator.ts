import HierarchicDesignator from './HierarchicDesignator'

export default class IsoHierarchicDesignator extends HierarchicDesignator {
  constructor (namespace: string, universalId: string) {
    super(namespace, universalId, 'ISO')
  }
}
