import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { prompt, templateId, apiKey: customKey } = await req.json();

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'Prompt is required (provide raw client notes or details).' },
        { status: 400 }
      );
    }

    const apiKey =
      customKey ||
      process.env.AI_API_KEY ||
      process.env.GROQ_API_KEY ||
      process.env.MOONSHOT_API_KEY ||
      process.env.OPENAI_API_KEY;

    const baseUrl =
      process.env.AI_BASE_URL ||
      (apiKey?.startsWith('gsk_')
        ? 'https://api.groq.com/openai/v1'
        : apiKey?.startsWith('sk-') && process.env.MOONSHOT_API_KEY
        ? 'https://api.moonshot.cn/v1'
        : 'https://api.xkiro.com/v1');

    const endpoint = `${baseUrl.replace(/\/+$/, '')}/chat/completions`;

    const model =
      process.env.AI_MODEL ||
      (apiKey?.startsWith('gsk_')
        ? 'llama-3.3-70b-versatile'
        : apiKey?.startsWith('sk-') && process.env.MOONSHOT_API_KEY
        ? 'moonshot-v1-8k'
        : 'qwen/qwen3.8-max:free');

    const systemPrompt = `You are the Lead Digital Strategist & Conversion Copywriter at EagleX Development (a premier bespoke web development agency).
Your task is to analyze raw notes from a client discovery meeting and generate an ultra-high-converting, complete website pitch content in strict JSON format.

The selected agency template theme is: "${templateId || 'apex-agency'}".

You must respond ONLY with a single valid JSON object with NO surrounding markdown backticks or explanation. The JSON must strictly conform to this schema:

{
  "clientName": "Extracted or inferred business name",
  "title": "Compelling pitch title (e.g. Skyline Dentistry - High-Conversion Digital Presence)",
  "slug": "url-safe-lowercase-slug-e.g-skyline-dentistry",
  "content": {
    "branding": {
      "primaryColor": "#ff5e00",
      "accentColor": "#3b82f6",
      "darkBackground": true,
      "fontFamily": "Inter"
    },
    "navbar": {
      "brandName": "Business Name",
      "logoUrl": "",
      "links": [
        {"label": "Services", "href": "#services"},
        {"label": "About", "href": "#about"},
        {"label": "Reviews", "href": "#reviews"},
        {"label": "Pricing", "href": "#pricing"},
        {"label": "FAQ", "href": "#faq"}
      ],
      "ctaText": "Get Free Estimate",
      "ctaLink": "#contact"
    },
    "hero": {
      "badge": "INDUSTRY LEADER OR VALUE TAG",
      "headline": "High-impact conversion headline tailored to the client",
      "subheadline": "Persuasive 2-sentence value proposition highlighting benefits and transformation.",
      "primaryCtaText": "Schedule a Consultation",
      "primaryCtaLink": "#contact",
      "secondaryCtaText": "Explore Capabilities",
      "secondaryCtaLink": "#services",
      "heroImageUrl": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
      "doctorImageUrl": "/images/dental/dr_sarah_jenkins.jpg",
      "beforeImageUrl": "/images/dental/smile_before.jpg",
      "afterImageUrl": "/images/dental/smile_after.jpg",
      "clinicImageUrl": "/images/dental/treatment_suite.jpg"
    },
    "marquee": {
      "title": "TRUSTED BY AMBITIOUS ENTERPRISES & LEADERS",
      "items": ["Forbes", "Bloomberg", "TechCrunch", "Inc 5000", "Fast Company"]
    },
    "services": {
      "badge": "CORE CAPABILITIES",
      "title": "Comprehensive Solutions Built For Results",
      "subtitle": "Everything you need to outperform your competitors.",
      "items": [
        {
          "id": "1",
          "title": "Service 1 Title",
          "description": "2-3 sentences explaining the tangible outcome of this service.",
          "badge": "Most Requested",
          "icon": "Layers"
        },
        {
          "id": "2",
          "title": "Service 2 Title",
          "description": "2-3 sentences explaining the tangible outcome of this service.",
          "badge": "High ROI",
          "icon": "TrendingUp"
        },
        {
          "id": "3",
          "title": "Service 3 Title",
          "description": "2-3 sentences explaining the tangible outcome of this service.",
          "badge": "Modern Tech",
          "icon": "Cpu"
        }
      ]
    },
    "about": {
      "badge": "WHY CHOOSE US",
      "title": "Decades of Dedicated Craftsmanship",
      "description": "Storytelling paragraph positioning the client as the undisputed authority in their niche.",
      "metrics": [
        {"id": "1", "label": "Client Satisfaction", "value": "99.4%"},
        {"id": "2", "label": "Revenue Increase", "value": "3.8x"},
        {"id": "3", "label": "Completed Projects", "value": "250+"}
      ],
      "imageUrl": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80"
    },
    "testimonials": {
      "badge": "PROVEN RESULTS",
      "title": "Loved by Clients Across the Country",
      "subtitle": "Real feedback from satisfied customers.",
      "items": [
        {
          "id": "1",
          "name": "Sarah Collins",
          "role": "Chief Executive",
          "company": "Summit Partners",
          "content": "Working with them was the best business decision we made this year. Inbound conversions jumped by 140% in our first month.",
          "rating": 5
        },
        {
          "id": "2",
          "name": "Marcus Vance",
          "role": "Founder & Director",
          "company": "Vance Media",
          "content": "Flawless execution, fast turnaround, and unmatched design quality.",
          "rating": 5
        }
      ]
    },
    "pricing": {
      "badge": "TRANSPARENT PLANS",
      "title": "Investment Packages Tailored To Your Growth",
      "subtitle": "Choose the level of engagement that matches your objectives.",
      "tiers": [
        {
          "id": "1",
          "name": "Essential Growth",
          "price": "$2,490",
          "period": "one-time",
          "description": "Ideal for established businesses looking to modernize their online brand.",
          "features": ["Full Custom 5-Page Responsive Web Experience", "Search Engine Optimization & Google Schema", "Mobile & Tablet Optimization", "14-Day Rapid Delivery"],
          "ctaText": "Select Essential",
          "ctaLink": "#contact"
        },
        {
          "id": "2",
          "name": "Apex Enterprise",
          "price": "$4,950",
          "period": "one-time",
          "description": "Full-scale conversion architecture designed for market leaders.",
          "features": ["Complete Bespoke Multi-Section System", "Advanced Animation & Micro-Interactions", "Custom CRM & Lead Generation Webhooks", "Priority 24/7 Dedicated Support", "A/B Testing Optimization"],
          "isPopular": true,
          "ctaText": "Select Apex Enterprise",
          "ctaLink": "#contact"
        }
      ]
    },
    "ctaBanner": {
      "title": "Ready To Transform Your Digital Presence?",
      "description": "Let’s build something extraordinary that turns visitors into high-paying clients.",
      "buttonText": "Schedule Your Kickoff Call",
      "buttonLink": "#contact"
    },
    "faq": {
      "badge": "FREQUENTLY ASKED QUESTIONS",
      "title": "Got Questions? We Have Answers",
      "subtitle": "Clear, upfront clarity on how we deliver results.",
      "items": [
        {
          "id": "1",
          "question": "What is the expected delivery timeline?",
          "answer": "Our typical delivery turnaround is between 7 to 14 business days from agreement to full deployment."
        },
        {
          "id": "2",
          "question": "Will our team be able to make edits easily?",
          "answer": "Yes! The system is built modularly with dynamic content management, making text and image updates effortless."
        },
        {
          "id": "3",
          "question": "How is SEO and page speed handled?",
          "answer": "All code is statically optimized with 95+ PageSpeed metrics, semantic markup, and instant image caching."
        }
      ]
    },
    "contact": {
      "badge": "GET IN TOUCH",
      "title": "Let’s Start Building Your Project",
      "subtitle": "Fill out the quick inquiry below or reach out directly.",
      "email": "contact@clientcompany.com",
      "phone": "+1 (555) 019-2834",
      "address": "San Francisco, CA"
    },
    "footer": {
      "brandName": "Business Name",
      "description": "Crafted with precision by EagleX Development. Engineered for ambitious brands.",
      "copyright": "© 2026 Business Name. All rights reserved.",
      "links": [
        {"label": "Privacy Policy", "href": "#"},
        {"label": "Terms of Service", "href": "#"},
        {"label": "Contact", "href": "#contact"}
      ]
    }
  }
}`;

    if (!apiKey) {
      // Fallback: If no API key configured yet, generate intelligent mock JSON based on client prompt
      const clientName =
        prompt.split('\n')[0].replace(/[^a-zA-Z0-9 ]/g, '').trim() || 'Client Enterprise';
      const slug = clientName.toLowerCase().replace(/[^a-z0-9]+/g, '-');

      return NextResponse.json({
        success: true,
        data: {
          clientName,
          title: `${clientName} - High-Converting Web Presence`,
          slug,
          content: {
            branding: {
              primaryColor: '#ff5e00',
              accentColor: '#3b82f6',
              darkBackground: true,
              fontFamily: 'Inter',
            },
            navbar: {
              brandName: clientName,
              logoUrl: '',
              links: [
                { label: 'Services', href: '#services' },
                { label: 'About', href: '#about' },
                { label: 'Reviews', href: '#reviews' },
                { label: 'Pricing', href: '#pricing' },
                { label: 'FAQ', href: '#faq' },
              ],
              ctaText: 'Get Started',
              ctaLink: '#contact',
            },
            hero: {
              badge: 'NEXT-GENERATION DIGITAL EXPERIENCE',
              headline: `Empowering ${clientName} With High-Converting Digital Presence`,
              subheadline: `Based on your requirements: ${prompt.slice(0, 160)}...`,
              primaryCtaText: 'Schedule a Consultation',
              primaryCtaLink: '#contact',
              secondaryCtaText: 'Explore Capabilities',
              secondaryCtaLink: '#services',
              heroImageUrl:
                'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
            },
            marquee: {
              title: 'TRUSTED BY AMBITIOUS ENTERPRISES',
              items: ['Forbes', 'Bloomberg', 'TechCrunch', 'Inc 5000', 'Fast Company'],
            },
            services: {
              badge: 'CORE CAPABILITIES',
              title: 'Tailored Solutions Engineered For Growth',
              subtitle: 'Designed specifically to meet your unique operational goals.',
              items: [
                {
                  id: '1',
                  title: 'Bespoke Digital Experience',
                  description: 'Engaging, modern web application with high performance.',
                  badge: 'Flagship',
                  icon: 'Layers',
                },
                {
                  id: '2',
                  title: 'Lead Conversion Funnels',
                  description: 'Optimized user journeys that turn casual visitors into paying customers.',
                  badge: 'Growth',
                  icon: 'TrendingUp',
                },
                {
                  id: '3',
                  title: 'Automated System Pipelines',
                  description: 'Connect with CRM, calendar booking, and automated email follow-ups.',
                  badge: 'Modern',
                  icon: 'Cpu',
                },
              ],
            },
            about: {
              badge: 'WHY WORK WITH US',
              title: 'Proven Track Record of Excellence',
              description:
                'We combine strategic technical development with bold design aesthetics to elevate your enterprise above the competition.',
              metrics: [
                { id: '1', label: 'Average ROI Increase', value: '340%' },
                { id: '2', label: 'PageSpeed Score', value: '99/100' },
                { id: '3', label: 'Client Retention', value: '98.5%' },
              ],
              imageUrl:
                'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80',
            },
            testimonials: {
              badge: 'CLIENT TESTIMONIALS',
              title: 'Endorsed by Industry Leaders',
              subtitle: 'See what our partners say about our work.',
              items: [
                {
                  id: '1',
                  name: 'Sarah Jenkins',
                  role: 'Chief Executive',
                  company: 'Nexus Innovations',
                  content:
                    'Our inbound lead volume doubled within 30 days of launching the new site. The design aesthetic is incredible.',
                  rating: 5,
                },
              ],
            },
            pricing: {
              badge: 'INVESTMENT',
              title: 'Simple, Transparent Packages',
              subtitle: 'High-impact solutions with guaranteed ROI.',
              tiers: [
                {
                  id: '1',
                  name: 'Standard Package',
                  price: '$2,500',
                  period: 'one-time',
                  description: 'Complete bespoke web presence.',
                  features: ['5 Core Sections', 'Mobile Responsive', 'SEO Optimization'],
                  ctaText: 'Select Plan',
                  ctaLink: '#contact',
                },
                {
                  id: '2',
                  name: 'Enterprise Tier',
                  price: '$4,800',
                  period: 'one-time',
                  description: 'All-inclusive growth engine with integrations.',
                  features: ['10 Dynamic Sections', 'AI Integration', 'CRM Webhooks', 'Priority Support'],
                  isPopular: true,
                  ctaText: 'Select Enterprise',
                  ctaLink: '#contact',
                },
              ],
            },
            ctaBanner: {
              title: 'Ready To Scale Your Brand?',
              description: 'Partner with us to create a digital presence that converts.',
              buttonText: 'Claim Your Strategy Call',
              buttonLink: '#contact',
            },
            faq: {
              badge: 'FAQ',
              title: 'Common Questions',
              subtitle: 'Clear answers on how we collaborate.',
              items: [
                {
                  id: '1',
                  question: 'How fast is delivery?',
                  answer: 'Standard projects launch in 7 to 14 business days.',
                },
              ],
            },
            contact: {
              badge: 'CONTACT',
              title: 'Get In Touch',
              subtitle: 'Let’s discuss your vision.',
              email: 'hello@eaglex.co.in',
            },
            footer: {
              brandName: clientName,
              description: 'Engineered by EagleX Development.',
              copyright: `© ${new Date().getFullYear()} ${clientName}. All rights reserved.`,
              links: [{ label: 'Contact', href: '#contact' }],
            },
          },
        },
      });
    }

    // Call external LLM endpoint
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: systemPrompt },
          {
            role: 'user',
            content: `Here are the raw notes from the client discovery meeting:\n\n${prompt}\n\nPlease generate the complete pitch content JSON now.`,
          },
        ],
        temperature: 0.7,
        max_tokens: 3500,
        response_format: { type: 'json_object' },
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('LLM API error:', errText);
      return NextResponse.json(
        { error: `LLM API Error (${response.status}): ${errText}` },
        { status: 500 }
      );
    }

    const data = await response.json();
    let rawContent = data.choices?.[0]?.message?.content || '';

    // Strip markdown code block fences if present (e.g. ```json ... ```)
    if (rawContent.includes('```')) {
      const match = rawContent.match(/```(?:json)?([\s\S]*?)```/);
      if (match && match[1]) {
        rawContent = match[1].trim();
      }
    }

    let parsedJson;
    try {
      parsedJson = JSON.parse(rawContent.trim());
    } catch (e) {
      console.error('Failed to parse LLM JSON:', rawContent);
      return NextResponse.json(
        { error: 'AI generated invalid JSON. Please retry.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data: parsedJson });
  } catch (err: any) {
    console.error('AI generation route error:', err);
    return NextResponse.json(
      { error: err?.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
