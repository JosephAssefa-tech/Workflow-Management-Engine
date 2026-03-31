// minimal-provider.ts
export default class MinimalPropertiesProvider {
  constructor(propertiesPanel) {
    console.log('✅ MinimalPropertiesProvider loaded');
  }

  getGroups(element) {
    return (groups) => {
      console.log('Minimal provider running for:', element?.type);
      
      // Add a test group for ANY element
      groups.push({
        id: 'test-group',
        label: '🔴 TEST GROUP (should be visible)',
        entries: [
          {
            id: 'test-field',
            component: 'text-field',
            label: 'Test Field',
            get: () => ({ 'test-field': 'test value' }),
            set: () => {}
          }
        ]
      });
      
      return groups;
    };
  }
}