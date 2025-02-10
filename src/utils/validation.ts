import Joi from 'joi';

/**
 * Validate the event payload.
 * @param payload - The event payload to validate.
 * @returns The validation result.
 */
export const validateEvent = (payload: any): Joi.ValidationResult => {
  let schema
  switch (payload.EventName) {
    case 'CustomerCreated':
      schema = Joi.object({
        EventTime: Joi.date().iso().required(),
        EventName: Joi.string().valid('CustomerCreated').required(),
        EntityName: Joi.string().required(),
        Sequence: Joi.number().required(),
        Payload: Joi.object({
          CustomerId: Joi.string().required(),
        }).required(),
      });
      break;

    case 'CustomerDeleted':
      schema = Joi.object({
        EventTime: Joi.date().iso().required(),
        EventName: Joi.string().valid('CustomerDeleted').required(),
        EntityName: Joi.string().required(),
        Sequence: Joi.number().required(),
        Payload: Joi.object({
          CustomerId: Joi.string().required(),
        }).required(),
      });
      break;

    case 'OrderCanceled':
      schema = Joi.object({
        EventTime: Joi.date().iso().required(),
        EventName: Joi.string().valid('OrderCanceled').required(),
        EntityName: Joi.string().required(),
        Sequence: Joi.number().required(),
        Payload: Joi.object({
          OrderId: Joi.string().required(),
        }).required(),
      });
      break;

    case 'OrderReturned':
      schema = Joi.object({
        EventTime: Joi.date().iso().required(),
        EventName: Joi.string().valid('OrderReturned').required(),
        EntityName: Joi.string().required(),
        Sequence: Joi.number().required(),
        Payload: Joi.object({
          OrderId: Joi.string().required(),
        }).required(),
      });
      break;
    
    // Default case for OrderPlaced
    default:
      schema = Joi.object({
        EventTime: Joi.date().iso().required(),
        EventName: Joi.string().valid('CustomerCreated', 'CustomerDeleted', 'OrderPlaced', 'OrderReturned', 'OrderCanceled').required(),
        EntityName: Joi.string().required(),
        Sequence: Joi.number().required(),
        Payload: Joi.object({
          CustomerId: Joi.string().required(),
          OrderId: Joi.string(),
          TotalOrderAmount: Joi.number().positive(),
        }).required(),
      });
      break;
  }
  

  return schema.validate(payload);
};

/**
 * Validate the consume points request body.
 * @param body - The request body to validate.
 * @returns The validation result.
 */
export const validateConsumePoints = (body: any): Joi.ValidationResult => {
  const schema = Joi.object({
    points: Joi.number().min(1).positive().required(),
  });

  return schema.validate(body);
};