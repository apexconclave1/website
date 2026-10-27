/**
 * The two drawn vessel shapes, shared by the hero drift (VesselDrift) and the Coming soon cards (VesselMark).
 * Coordinates are in each shape's own box (w × h). `light`: the lit left shoulder; `rim`: the right edge that
 * catches the lime rim light; `mouth`: the opening.
 */
export type VesselKind = 'bowl' | 'jar';

export const vesselShapes: Record<
  VesselKind,
  { w: number; h: number; body: string; light: string; rim: string; mouth: { cx: number; cy: number; rx: number; ry: number } }
> = {
  // Wide bowl: narrow opening, full shoulders
  bowl: {
    w: 600,
    h: 520,
    body: 'M150,60 C60,110 10,220 20,330 C30,430 140,500 300,505 C460,500 570,430 580,330 C590,220 540,110 450,60 A150,22 0 0 1 150,60 Z',
    light: 'M150,60 C60,110 10,220 20,330',
    rim: 'M450,60 C540,110 590,220 580,330',
    mouth: { cx: 300, cy: 60, rx: 150, ry: 22 },
  },
  // Tall jar: small mouth, high shoulder
  jar: {
    w: 400,
    h: 620,
    body: 'M130,50 C60,110 10,260 30,400 C50,520 120,600 200,605 C280,600 350,520 370,400 C390,260 340,110 270,50 A70,12 0 0 1 130,50 Z',
    light: 'M130,50 C60,110 10,260 30,400',
    rim: 'M270,50 C340,110 390,260 370,400',
    mouth: { cx: 200, cy: 50, rx: 70, ry: 12 },
  },
};
