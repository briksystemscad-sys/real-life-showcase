<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep the restaurant experience as anchored sections on the index route, matching the reference's single-page navigation.
- Store downloaded restaurant media as Lovable asset pointers; generated logo artwork remains imported source artwork.
- Keep business contact configuration absent until verified details are supplied; catering preparation downloads an enquiry draft rather than claiming submission.
- Define restaurant visual styling in the global semantic design system and expose action styles through Button variants for consistent presentation.
- Keep supplementary restaurant content in a focused component and use progressive, reduced-motion-aware scroll reveals so content remains accessible without animation.
- Media is served from public/media (pointer urls rewritten) so the site works on external hosts like Vercel.
