<template>
  <button :class="`x-button ${type} ${size}`"><slot></slot></button>
  <!-- <button :class="`x-button ${type}`" :hover-2class="`${type}-hover`"><slot></slot></button> -->
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'

export default {
  props: {
    type: {
      default: 'fill'
    },
    size: {
      default: 'default'
    }
  }
}
</script>

<style lang="scss">

.fill-hover,
.fill:active {
  box-shadow: inset 0 0 0 2em var(--hover);
}

// Animate the size, outside
.pulse-hover,
.pulse:active {
  animation: pulse 0.4s;
  box-shadow: 0 0 0 1em rgba(#fff,0);
}

@keyframes pulse {
  0% { box-shadow: 0 0 0 0 var(--hover); }
}

// Stack multiple shadows, one from the left, the other from the right
.close-hover,
.close:active {
  box-shadow:
    inset -3.5em 0 0 0 var(--hover),
    inset 3.5em 0 0 0 var(--hover);
}

// Size can also be negative; see how it's smaller than the element
.raise-hover,
.raise:active {
  box-shadow: 0 0.5em 0.5em -0.4em var(--hover);
  transform: translateY(-0.25em);
}

// Animating from the bottom
.up-hover,
.up:active {
  box-shadow: inset 0 -3.25em 0 0 var(--hover);
}

// And from the left
.slide-hover,
.slide:active {
  box-shadow: inset 6.5em 0 0 0 var(--hover);
}

// Multiple shadows, one on the outside, another on the inside
.offset {
  box-shadow:
    0.3em 0.3em 0 0 var(--color),
    inset 0.3em 0.3em 0 0 var(--color);

  &-hover,
  &:active {
    box-shadow:
      0 0 0 0 var(--hover),
      inset 6em 3.5em 0 0 var(--hover);
  }
}

//=== Set button colors
// If you wonder why use Sass vars or CSS custom properties...
  // Make a map with the class names and matching colors
$colors: (
  fill: #a972cb,
  pulse: #fad586,
  close: #ff7f82,
  raise: #29bb89,
  up: #e4cb58,
  slide: #8fc866,
  offset: #19bc8b
);

// Sass variables compile to a static string; CSS variables are dynamic and inherited
  // Loop through the map and set CSS custom properties using Sass variables
@each $button, $color in $colors {
  .#{$button} {
    --color: #{$color};
    --hover: #{adjust-hue($color, 45deg)};
  }
}

// Now every button will have different colors as set above. We get to use the same structure, only changing the custom properties.
.x-button {
  color: #fff;
  // color: var(--color);
  transition: 0.2s;
  // background-color: var(--color);
  background: var(--color);

  &-hover,
  &:active {
    border-color: var(--hover);
    color: #fff;
  }
}

// Basic button styles
.x-button {
  // background: none;
  border: 2rpx solid;
  font: inherit;
  line-height: 1;
  // margin: 0.5em;
  &.large {
    display: block;
    padding: 1em 2em;
  }
  &.default {
    display: inline-block;
    padding: 0.6em 2em;
  }
}

</style>
