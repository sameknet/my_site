<div class="copyright" >
  {% set current = date(Date.now(), "YYYY") %}
  &copy; {% if theme.since and theme.since != current %} {{ theme.since }} - {% endif %}
  <span itemprop="copyrightYear">{{ current }}</span>
  <span class="author" itemprop="copyrightHolder">{{ config.author }}</span>
  <span class="post-count"> - {{ totalcount(site) }}</span>
</div>

{% if theme.copyright %}
<div class="powered-by">
  {{ __('footer.powered', '<a class="theme-link" href="https://dindikbud.bantenprov.go.id">Dinas Pendidikan dan Kebudayaan Provinsi Banten</a> | <a class="theme-link" href="https://diskominfo.bantenprov.go.id">Diskominfo-SP Provinsi Banten</a>') }}
</div>
{% endif %}
