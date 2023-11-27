import HierarchicDesignator from './HierarchicDesignator'

export default class CliaHierarchicDesignator extends HierarchicDesignator {
  constructor (namespace: string, universalId: string) {
    super(namespace, universalId, 'CLIA')
  }
}
