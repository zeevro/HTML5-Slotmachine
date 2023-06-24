import pathlib

import jinja2


TEMPLATE = '''<?xml version="1.0" encoding="utf-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 186 118" style="fill: #010101; background-color: white;">
	<!-- main shape -->
	<polygon points="50.91,107.76 98.47,107.76 125.58,90.87 125.58,49 135.09,43.04 135.09,10.24 87.82,10.24 50.91,32.53"/>

	<!-- contacts -->
	<polygon points="80.15,25.47 95.03,25.47 115.74,11.3 100.88,11.3" style="fill: #E98724;"/>

	<!-- ink color -->
	{% if not ink_level %}
	<rect x="54.24" y="35.36" width="41.59" height="69.13" style="fill: {{ ink_color }};"/>
	{% else %}
	<rect x="54.24" y="35.36" width="41.59" height="69.13" style="fill: white;"/>
	{% if ink_level == '10' %}
	<rect x="54.24" y="88.86" width="41.59" height="15.63" style="fill: {{ ink_color }};"/>
	{% elif ink_level == '20' %}
	<rect x="54.24" y="77.35" width="41.59" height="27.14" style="fill: {{ ink_color }};"/>
	{% endif %}
	{% endif %}

	<!-- lines -->
	<path d="M66.91,38.42h17.01c1.13,0,2.05,0.87,2.05,1.95l0,0c0,1.07-0.92,1.95-2.05,1.95H66.17 c-1.13,0-2.05-0.87-2.05-1.95l0,0c0-1.07,0.92-1.95,2.05-1.95H66.91z"/>
	<path d="M53.89,95.91H65.1c0.75,0,1.35,0.87,1.35,1.95l0,0c0,1.07-0.6,1.95-1.35,1.95H53.4 c-0.75,0-1.35-0.87-1.35-1.95l0,0c0-1.07,0.6-1.95,1.35-1.95H53.89z"/>
	<path d="M83.71,95.91h12.34c0.82,0,1.48,0.87,1.48,1.95l0,0c0,1.07-0.66,1.95-1.48,1.95H83.17 c-0.82,0-1.48-0.87-1.48-1.95l0,0c0-1.07,0.66-1.95,1.48-1.95H83.71z"/>

	<!-- letter -->
	{% if letter == 'C' %}
	<path d="M75.88,82.44c-4.22-0.34-7.38-4.04-7.03-8.28c0.35-4.24,4.04-7.38,8.28-7.03c2.12,0.17,3.97,1.18,5.24,2.69 l2.63-1.99c-1.8-2.64-4.66-4.46-8-4.74c-6.03-0.48-11.34,4.26-11.86,10.62c-0.52,6.36,3.96,11.9,10,12.39 c3.97,0.33,7.63-1.64,9.81-4.81l-2.3-1.86C81.09,81.44,78.61,82.67,75.88,82.44z"/>
	{% elif letter == 'M' %}
	<polygon points="62.2,81.76 66.04,81.76 66.04,66.32 73.13,79.78 74.5,79.78 74.5,73.46 67.96,61.23 62.2,61.23"/>
	<polygon points="86.76,81.76 82.92,81.76 82.92,66.32 75.83,79.78 74.45,79.78 74.45,73.46 81,61.23 86.76,61.23"/>
	{% elif letter == 'Y' %}
	<polygon points="72.97,84.17 76.91,84.17 76.91,75.2 84.75,62.8 80.81,62.8 74.99,71.86 69.17,62.8 65.34,62.8 72.9,75.2"/>
	{% endif %}
	{% if ink_level %}

	<!-- fader -->
	<rect x="0" y="0" width="186" height="118" style="fill: white; fill-opacity: {{ fader_opacity }};"/>
	{% endif %}
</svg>
'''


OUTPUT_DIR = pathlib.Path('img')


def main():
    t = jinja2.Template(TEMPLATE, trim_blocks=True, lstrip_blocks=True)

    OUTPUT_DIR.mkdir(exist_ok=True)

    for letter, ink_color in [('C', '#2BAADF'), ('M', '#E4178B'), ('Y', '#F7E920')]:
        for ink_level, fader_opacity in [('', 0), ('00', 0.7), ('10', 0.5), ('20', 0.4)]:
            OUTPUT_DIR.joinpath(f'{letter}{ink_level}.svg').write_text(t.render(**locals()))


if __name__ == "__main__":
    main()
