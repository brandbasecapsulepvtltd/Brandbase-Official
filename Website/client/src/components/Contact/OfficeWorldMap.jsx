'use client';

import { useEffect, useRef, useCallback } from 'react';
import * as d3 from 'd3';
import { feature } from 'topojson-client';
import { useTheme } from 'next-themes';

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

const COLORS = {
  light: {
    ocean: '#f1f5f9',
    land: '#cbd5e1',
    landStroke: '#ffffff',
    marker: '#FF6600',
    markerStroke: '#ffffff',
    labelBg: '#ffffff',
    labelText: '#0f172a',
  },
  dark: {
    ocean: '#0f172a',
    land: '#334155',
    landStroke: '#475569',
    marker: '#FF6600',
    markerStroke: '#1e293b',
    labelBg: '#1e293b',
    labelText: '#f8fafc',
  },
};

export default function OfficeWorldMap({ offices, activeId, onSelect }) {
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const geoRef = useRef(null);
  const { resolvedTheme } = useTheme();

  const render = useCallback(() => {
    const container = containerRef.current;
    const svg = d3.select(svgRef.current);
    if (!container || !geoRef.current) return;

    const width = container.clientWidth;
    const height = container.clientHeight;
    if (width === 0 || height === 0) return;

    const isDark = resolvedTheme === 'dark';
    const colors = isDark ? COLORS.dark : COLORS.light;

    const projection = d3
      .geoNaturalEarth1()
      .fitExtent(
        [[12, 8], [width - 12, height - 8]],
        geoRef.current
      );

    const path = d3.geoPath().projection(projection);

    svg.selectAll('*').remove();
    svg.attr('width', width).attr('height', height);

    svg
      .append('rect')
      .attr('width', width)
      .attr('height', height)
      .attr('fill', colors.ocean)
      .attr('rx', 0);

    svg
      .append('g')
      .selectAll('path')
      .data(geoRef.current.features)
      .join('path')
      .attr('d', path)
      .attr('fill', colors.land)
      .attr('stroke', colors.landStroke)
      .attr('stroke-width', 0.6);

    const markerLayer = svg.append('g').attr('class', 'markers');

    offices.forEach((office) => {
      const coords = projection([office.lng, office.lat]);
      if (!coords) return;

      const [x, y] = coords;
      const isActive = activeId === office.id;
      const g = markerLayer
        .append('g')
        .attr('transform', `translate(${x},${y})`)
        .attr('cursor', 'pointer')
        .attr('role', 'button')
        .attr('tabindex', 0)
        .attr('aria-label', `${office.city}, ${office.country}`)
        .on('click', () => onSelect(office.id))
        .on('mouseenter', () => onSelect(office.id))
        .on('keydown', (event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onSelect(office.id);
          }
        });

      if (isActive || office.isHQ) {
        g.append('circle')
          .attr('r', isActive ? 18 : 12)
          .attr('fill', colors.marker)
          .attr('opacity', isActive ? 0.2 : 0.1);
      }

      g.append('circle')
        .attr('r', isActive ? 7 : 5.5)
        .attr('fill', colors.marker)
        .attr('stroke', colors.markerStroke)
        .attr('stroke-width', 2.5);

      if (isActive) {
        const label = `${office.city}${office.isHQ ? ' · HQ' : ''}`;
        const padding = 10;
        const textWidth = label.length * 7.2 + padding * 2;

        g.append('rect')
          .attr('x', -textWidth / 2)
          .attr('y', -34)
          .attr('width', textWidth)
          .attr('height', 22)
          .attr('rx', 6)
          .attr('fill', colors.labelBg)
          .attr('stroke', isDark ? '#475569' : '#e2e8f0')
          .attr('stroke-width', 1)
          .attr('filter', 'drop-shadow(0 1px 2px rgb(0 0 0 / 0.08))');

        g.append('text')
          .attr('y', -19)
          .attr('text-anchor', 'middle')
          .attr('fill', colors.labelText)
          .attr('font-size', 12)
          .attr('font-weight', 600)
          .attr('font-family', 'system-ui, sans-serif')
          .text(label);
      }
    });
  }, [offices, activeId, onSelect, resolvedTheme]);

  useEffect(() => {
    let cancelled = false;

    fetch(GEO_URL)
      .then((res) => res.json())
      .then((topology) => {
        if (cancelled) return;
        geoRef.current = feature(topology, topology.objects.countries);
        render();
      })
      .catch(() => {
        /* map stays on ocean background if fetch fails */
      });

    return () => {
      cancelled = true;
    };
  }, [render]);

  useEffect(() => {
    render();
  }, [render]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(() => render());
    observer.observe(container);
    return () => observer.disconnect();
  }, [render]);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full">
      <svg ref={svgRef} className="block w-full h-full" aria-hidden="true" />
    </div>
  );
}
