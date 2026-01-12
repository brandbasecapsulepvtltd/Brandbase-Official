const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Policy = require('../models/Policy');

dotenv.config();

const policies = [
    {
        type: 'privacy-policy',
        title: 'Privacy Policy',
        lastUpdated: 'December 17, 2025',
        intro: 'At Brandbase Capsule, we prioritize your privacy and are committed to protecting your personal information. This policy outlines how we collect, use, and safeguard your data when you engage with our services.',
        sections: [
            {
                heading: 'Information We Collect',
                iconName: 'Eye',
                content: [
                    { type: 'paragraph', text: 'We gather information through various interactions:' },
                    {
                        type: 'list',
                        items: [
                            { text: 'Form submissions on our website' },
                            { text: 'Quote requests and callback inquiries' },
                            { text: 'Newsletter subscriptions' },
                            { text: 'Direct communications via email, chat, or phone' }
                        ]
                    },
                    { type: 'paragraph', text: 'The data collected may include:' },
                    {
                        type: 'list',
                        items: [
                            { text: 'Personal identification (name, email, phone)' },
                            { text: 'Professional details (company name, role)' },
                            { text: 'Project requirements and specifications' },
                            { text: 'Technical data (IP address, browser information)' },
                            { text: 'Usage patterns through analytics' }
                        ]
                    }
                ],
                note: 'We do not collect sensitive financial or government identification data unless explicitly required for service delivery—and only with your express consent.'
            },
            {
                heading: 'How We Use Your Information',
                iconName: 'Globe',
                content: [
                    { type: 'paragraph', text: 'Your information enables us to:' },
                    {
                        type: 'list',
                        items: [
                            { text: 'Facilitate effective communication' },
                            { text: 'Deliver tailored services and solutions' },
                            { text: 'Provide relevant updates (with your consent)' },
                            { text: 'Enhance website functionality and user experience' },
                            { text: 'Comply with legal and regulatory requirements' }
                        ]
                    }
                ],
                note: 'We maintain strict confidentiality and never sell or trade your personal data. Third-party tools are employed only when necessary, with robust data protection measures in place.'
            },
            {
                heading: 'Data Protection & Security',
                iconName: 'Shield',
                content: [
                    { type: 'paragraph', text: 'We implement comprehensive security protocols including:' },
                    {
                        type: 'list',
                        items: [
                            { text: 'Advanced encryption technologies' },
                            { text: 'Secure server infrastructure' },
                            { text: 'Regular security audits and updates' },
                            { text: 'Strict access controls and authentication' }
                        ]
                    },
                    { type: 'paragraph', text: 'While we employ industry-best practices, we recommend exercising caution when sharing sensitive information online.' }
                ]
            },
            {
                heading: 'Cookies & Tracking Technologies',
                iconName: 'Lock',
                content: [
                    { type: 'paragraph', text: 'Our website utilizes:' },
                    {
                        type: 'list',
                        items: [
                            { text: 'Essential cookies for core functionality' },
                            { text: 'Analytical cookies (Google Analytics)' },
                            { text: 'Performance optimization cookies' },
                            { text: 'Preference-based cookies' }
                        ]
                    },
                    { type: 'paragraph', text: 'You retain full control over cookie preferences through your browser settings.' }
                ]
            },
            {
                heading: 'Third-Party Services',
                content: [
                    { type: 'paragraph', text: 'We collaborate with trusted partners for enhanced service delivery:' },
                    {
                        type: 'list',
                        items: [
                            { text: 'Communication platforms (Calendly, email services)' },
                            { text: 'Analytical tools (Google Analytics, Hotjar)' },
                            { text: 'Project management systems' },
                            { text: 'Cloud storage and backup solutions' }
                        ]
                    },
                    { type: 'paragraph', text: 'All third-party providers are carefully vetted for compliance with data protection standards.' }
                ]
            },
            {
                heading: 'Your Data Rights',
                content: [
                    { type: 'paragraph', text: 'You have the right to:' },
                    {
                        type: 'list',
                        items: [
                            { text: 'Access your personal information' },
                            { text: 'Request data correction or updating' },
                            { text: 'Withdraw consent for data processing' },
                            { text: 'Request data deletion (subject to legal requirements)' },
                            { text: 'Opt-out of marketing communications' }
                        ]
                    }
                ],
                note: 'To exercise these rights, contact our Data Protection Officer at <a href="mailto:privacy@brandbasecapsule.com" class="text-orange-600 hover:text-orange-700 font-semibold transition-colors break-all">privacy@brandbasecapsule.com</a>.'
            },
            {
                heading: 'Policy Updates',
                content: [
                    { type: 'paragraph', text: 'We regularly review and update this policy to reflect:' },
                    {
                        type: 'list',
                        items: [
                            { text: 'Changes in regulatory requirements' },
                            { text: 'Technological advancements' },
                            { text: 'Evolving business practices' },
                            { text: 'User feedback and industry standards' }
                        ]
                    },
                    { type: 'paragraph', text: 'Significant updates will be prominently communicated through our website.' }
                ]
            },
            {
                heading: 'Contact Information',
                content: [
                    { type: 'paragraph', text: 'For privacy-related inquiries or concerns:' },
                    {
                        type: 'contact',
                        contactDetails: {
                            company: 'Brandbase Capsule Pvt. Ltd.',
                            tagline: 'Transforming Brands with Digital Excellence',
                            email: 'info@brandbasecapsule.com',
                            privacyEmail: 'privacy@brandbasecapsule.com',
                            website: 'https://brandbasecapsule.com',
                            phone: '+91 98922 11456',
                            address: 'Office #204, 2nd Floor, Gulmohar Complex, Near Pimpleshwar Temple, Goregaon Railway Station, Mumbai - 400063'
                        }
                    }
                ]
            }
        ]
    },
    {
        type: 'terms-and-conditions',
        title: 'Terms and Conditions',
        lastUpdated: 'December 17, 2025',
        intro: 'Welcome to Brandbase Capsule. These Terms and Conditions govern your use of our website and services. Please read them carefully before accessing or using our platform.',
        sections: [
            {
                heading: 'Interpretation and Definitions',
                iconName: 'FileText',
                content: [
                    { type: 'paragraph', text: 'The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.' },
                    { type: 'subheading', text: 'Definitions' },
                    {
                        type: 'list',
                        items: [
                            { term: 'Affiliate', definition: 'means an entity that controls, is controlled by or is under common control with a party, where "control" means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.' },
                            { term: 'Country', definition: 'refers to: India' },
                            { term: 'Company', definition: '(referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to Brandbase Capsule Pvt. Ltd.' },
                            { term: 'Device', definition: 'means any device that can access the Service such as a computer, a cellphone or a digital tablet.' },
                            { term: 'Service', definition: 'refers to the Website.' },
                            { term: 'Terms and Conditions', definition: '(also referred as "Terms") mean these Terms and Conditions that form the entire agreement between You and the Company regarding the use of the Service.' },
                            { term: 'Third-party Social Media Service', definition: 'means any services or content (including data, information, products or services) provided by a third-party that may be displayed, included or made available by the Service.' },
                            { term: 'Website', definition: 'refers to Brandbase Capsule Pvt. Ltd, accessible from https://brandbasecapsule.com/' },
                            { term: 'You', definition: 'means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.' }
                        ]
                    }
                ]
            },
            {
                heading: 'Acknowledgment',
                iconName: 'Scale',
                content: [
                    { type: 'paragraph', text: 'These are the Terms and Conditions governing the use of this Service and the agreement that operates between You and the Company. These Terms and Conditions set out the rights and obligations of all users regarding the use of the Service.' },
                    { type: 'paragraph', text: 'Your access to and use of the Service is conditioned on Your acceptance of and compliance with these Terms and Conditions. These Terms apply to all visitors, users and others who access or use the Service.' },
                    { type: 'paragraph', text: 'By accessing or using the Service You agree to be bound by these Terms and Conditions. If You disagree with any part of these Terms, then You may not access the Service.' },
                    { type: 'warning', text: 'You represent that you are over the age of 18. The Company does not permit those under 18 to use the Service.' },
                    { type: 'paragraph', text: 'Your access to and use of the Service is also conditioned on Your acceptance of and compliance with the Privacy Policy of the Company.' }
                ]
            },
            {
                heading: 'Links to Other Websites',
                iconName: 'Globe',
                content: [
                    { type: 'paragraph', text: 'Our Service may contain links to third-party websites or services that are not owned or controlled by the Company.' },
                    { type: 'paragraph', text: 'The Company assumes no responsibility for the content, privacy policies, or practices of any third-party websites or services.' }
                ]
            },
            {
                heading: 'Termination',
                iconName: 'AlertCircle',
                content: [
                    { type: 'paragraph', text: 'We may terminate or suspend Your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if You breach these Terms and Conditions.' },
                    { type: 'paragraph', text: 'Upon termination, Your right to use the Service will cease immediately.' }
                ]
            },
            {
                heading: '"AS IS" and "AS AVAILABLE" Disclaimer',
                content: [
                    { type: 'paragraph', text: 'The Service is provided to You "AS IS" and "AS AVAILABLE" without warranty of any kind, whether express or implied.' },
                    { type: 'paragraph', text: 'The Company does not warrant that the Service will be uninterrupted, error-free, or free of harmful components.' }
                ]
            },
            {
                heading: 'Governing Law',
                content: [
                    { type: 'paragraph', text: 'The laws of the Country, excluding its conflicts of law rules, shall govern these Terms and Your use of the Service.' }
                ]
            },
            {
                heading: 'Disputes Resolution',
                content: [
                    { type: 'paragraph', text: 'If You have any dispute about the Service, You agree to first try to resolve the dispute informally by contacting the Company.' }
                ]
            },
            {
                heading: 'Severability and Waiver',
                content: [
                    { type: 'paragraph', text: 'If any provision of these Terms is held to be unenforceable, the remaining provisions will remain in effect.' }
                ]
            },
            {
                heading: 'Translation Interpretation',
                content: [
                    { type: 'paragraph', text: 'The original English version shall prevail in case of dispute.' }
                ]
            },
            {
                heading: 'Changes to These Terms and Conditions',
                content: [
                    { type: 'paragraph', text: 'We reserve the right to modify or replace these Terms at any time. Continued use of the Service means acceptance of the revised Terms.' }
                ]
            },
            {
                heading: 'Contact Us',
                content: [
                    { type: 'paragraph', text: 'If you have any questions about these Terms and Conditions, You can contact us:' },
                    {
                        type: 'contact',
                        contactDetails: {
                            email: 'info@brandbasecapsule.com',
                            phone: '+91 9892211456',
                            address: 'Office #204, 2nd Floor, Near Bus Depot Pimpleshwar Temple, Gulmohar Complex, Goregaon Railway Station, Goregaon East, India',
                            company: 'Brandbase Capsule Pvt. Ltd.'
                        }
                    }
                ]
            }
        ]
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        for (const policyData of policies) {
            await Policy.findOneAndUpdate(
                { type: policyData.type },
                policyData,
                { upsert: true, new: true }
            );
            console.log(`Seeded/Updated ${policyData.type}`);
        }

        console.log('Seeding completed successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDB();
