const GeminiService = require('../services/GeminiService');

async function testWorkflow() {
    console.log('Testing AI Blog Workflow with gemini-3-flash-preview...');

    const mockEvent = {
        name: 'OTM Mumbai 2026',
        industry: 'Travel & Tourism',
        city: 'Mumbai',
        startDate: '2026-02-10',
        endDate: '2026-02-12',
        venue: 'Jio World Convention Centre',
        description: 'The leading travel trade show in Asia.',
        blogConfiguration: {
            keywords: ['best stall design', 'custom booth', 'travel exhibition trends']
        }
    };

    try {
        console.log('\n--- 1. Generating Topics ---');
        console.log(`Event: ${mockEvent.name}`);
        console.log(`Keywords: ${mockEvent.blogConfiguration.keywords.join(', ')}`);

        const topics = await GeminiService.generateBlogTopics(mockEvent, mockEvent.blogConfiguration.keywords.join(', '));
        console.log('Generated Topics:', JSON.stringify(topics, null, 2));

        if (topics && topics.length > 0) {
            const selectedTopic = topics[0];
            console.log(`\n--- 2. Generating Content for: "${selectedTopic}" ---`);

            const content = await GeminiService.generateBlogContent(selectedTopic, mockEvent);
            console.log('Generated Content Summary:');
            console.log('Title:', content.title);
            console.log('Description:', content.description);
            console.log('Sections:', content.contentSections.length);
            console.log('Tags:', content.tags);
            console.log('\n✅ Workflow Test Passed!');
        } else {
            console.error('❌ No topics generated.');
        }
    } catch (error) {
        console.error('❌ Workflow Test Failed:', error);
    }
}

testWorkflow();
