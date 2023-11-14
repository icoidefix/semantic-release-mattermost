"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyConditions = void 0;
function verifyConditions(config, context) {
    var env = context.env, options = context.options, logger = context.logger;
    var errors = [];
    if (!options.plugins.find(function (p) { return p === '@semantic-release/release-notes-generator'
        || (p === null || p === void 0 ? void 0 : p[0]) === '@semantic-release/release-notes-generator'; })) {
        logger.error("The plugin @semantic-release/release-notes-generator was not found.");
        errors.push('missing-release-notes-generator');
    }
    if (!env.MATTERMOST_WEBHOOK && !config.webhook) {
        logger.error("No webhook found in config or env environment variable \"MATTERMOST_WEBHOOK\".", 'no-webhook');
        errors.push('missing-hook');
    }
    if (errors.length > 0) {
        throw new Error(errors.join('\n'));
    }
}
exports.verifyConditions = verifyConditions;
