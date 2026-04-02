export type CTAId = 
  | 'hero_get_early_access'
  | 'navbar_join_waitlist'
  | 'footer_join_waitlist'
  | 'pricing_explorer_start'
  | 'pricing_pro_get_started'
  | 'pricing_institutional_contact'
  | 'pipeline_export_code'
  | 'marketplace_publish'
  | 'marketplace_buy'
  | 'marketplace_fork'
  | 'referral_copy_link'
  | 'referral_share_twitter'
  | 'referral_share_linkedin';

export interface AnalyticsEvent {
  event: 'cta_click';
  cta_id: CTAId;
  page: 'nexus_lp_v1';
  extra?: Record<string, any>;
}

export const trackCTA = (cta_id: CTAId, extra?: Record<string, any>) => {
  const utm = new URLSearchParams(window.location.search);
  const utmParams: Record<string, string> = {};
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(p => {
    const val = utm.get(p);
    if (val) utmParams[p] = val;
  });

  const event: AnalyticsEvent = {
    event: 'cta_click',
    cta_id,
    page: 'nexus_lp_v1',
    extra: {
      ...extra,
      utm: utmParams,
      referrer: document.referrer,
    },
  };

  console.log('[Analytics]', event);
  // In a real app, this would call an analytics provider like Mixpanel or Segment
};
