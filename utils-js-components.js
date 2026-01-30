(function($) {
    'use strict';
    
    var UtilsJsComponents = {
        // Main initialization
        init: function() {
            this.targetToggle_init();
            this.passwordToggle_init();
        },
        
        // ==========================================
        // FEATURE: Target Toggle
        // ==========================================
        targetToggle_init: function() {
            var self = this;
            
            $(document).on('click', '[ujs-target-id]', function(e) {
                e.preventDefault();
                var $btn = $(this);
                var targetId = $btn.attr('ujs-target-id');
                var $target = $(targetId);
                var toggleClass = $btn.attr('ujs-toggle-class');
                var useFade = $btn.attr('ujs-anim-fade') !== undefined;
                var duration = parseInt($btn.attr('ujs-anim-duration')) || 300;
                var btnActiveClass = $btn.attr('ujs-btn-active-class') || 'active';
                
                // Determine if target will be visible after toggle
                var willBeVisible;
                if (toggleClass) {
                    willBeVisible = $target.hasClass(toggleClass);
                } else {
                    willBeVisible = !$target.is(':visible');
                }
                
                // Toggle button active class
                if (willBeVisible) {
                    $btn.addClass(btnActiveClass);
                } else {
                    $btn.removeClass(btnActiveClass);
                }
                
                // Toggle target
                if (useFade) {
                    self.targetToggle_withFade($target, toggleClass, duration);
                } else {
                    self.targetToggle_instant($target, toggleClass);
                }
            });
        },
        
        targetToggle_withFade: function($target, toggleClass, duration) {
            duration = duration || 300;
            
            if (toggleClass) {
                // Toggle class-based visibility with fade
                if ($target.hasClass(toggleClass)) {
                    // Currently hidden, show it
                    $target.css('opacity', 0).removeClass(toggleClass);
                    $target.animate({opacity: 1}, duration);
                } else {
                    // Currently visible, hide it
                    $target.animate({opacity: 0}, duration, function() {
                        $target.addClass(toggleClass).css('opacity', '');
                    });
                }
            } else {
                // Toggle inline display with fade
                if ($target.is(':visible')) {
                    $target.fadeOut(duration);
                } else {
                    $target.fadeIn(duration);
                }
            }
        },
        
        targetToggle_instant: function($target, toggleClass) {
            if (toggleClass) {
                $target.toggleClass(toggleClass);
            } else {
                if ($target.css('display') === 'none') {
                    $target.css('display', '');
                } else {
                    $target.css('display', 'none');
                }
            }
        },
        
        // ==========================================
        // FEATURE: Password Show/Hide
        // ==========================================
        passwordToggle_init: function() {
            var self = this;
            
            // Setup all password inputs with the attribute
            $('[ujs-pass-show-hide]').each(function() {
                self.passwordToggle_setup($(this));
            });
        },
        
        passwordToggle_setup: function($input) {
            var self = this;
            
            // Get custom button classes
            var customBtnClass = $input.attr('ujs-pass-btn-class') || '';
            var btnClass = 'pass-eye' + (customBtnClass ? ' ' + customBtnClass : '');
            
            // Check if already wrapped
            if ($input.parent().hasClass('password-toggle-wrapper')) {
                return; // Already setup
            }
            
            // Wrap the input
            $input.wrap('<div class="password-toggle-wrapper" style="position: relative; display: inline-block; width: 100%;"></div>');
            
            // Create toggle button with icons
            var $button = $('<button type="button" class="' + btnClass + '" style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); border: none; background: transparent; cursor: pointer; padding: 5px;"></button>');
            
            // Create eye icons (using Bootstrap Icons by default)
            var $eyeOff = $('<i class="bi bi-eye"></i>');
            var $eyeOn = $('<i class="bi bi-eye-slash" style="display: none;"></i>');
            
            $button.append($eyeOff).append($eyeOn);
            
            // Insert button after input
            $input.after($button);
            
            // Adjust input padding to make room for button
            var inputPaddingRight = parseInt($input.css('padding-right')) || 0;
            $input.css('padding-right', (inputPaddingRight + 35) + 'px');
            
            // Attach click handler
            $button.on('click', function(e) {
                e.preventDefault();
                self.passwordToggle_toggle($input, $button);
            });
        },
        
        passwordToggle_toggle: function($input, $button) {
            var currentType = $input.attr('type');
            var $eyeOff = $button.find('.bi-eye');
            var $eyeOn = $button.find('.bi-eye-slash');
            
            if (currentType === 'password') {
                // Show password
                $input.attr('type', 'text');
                $eyeOff.hide();
                $eyeOn.show();
            } else {
                // Hide password
                $input.attr('type', 'password');
                $eyeOff.show();
                $eyeOn.hide();
            }
        }
    };
    
    // Auto-initialize on document ready
    $(document).ready(function() {
        UtilsJsComponents.init();
    });
    
    // Expose to window for manual init if needed
    window.UtilsJsComponents = UtilsJsComponents;
    
})(jQuery);